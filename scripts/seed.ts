import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
  console.log("⚠️  Please provide valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to run the seed script.")
  process.exit(0)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const NUM_PRODUCTS = 200

const CATEGORIES = [
  "Home Goods",
  "Apparel",
  "Jewelry",
  "Art",
  "Beauty",
  "Food",
  "Accessories"
]

const ADJECTIVES = [
  "Handcrafted", "Rustic", "Vintage", "Modern", "Minimalist", "Cozy", 
  "Organic", "Sustainable", "Artisanal", "Bespoke", "Colorful", "Elegant"
]

const NOUNS = [
  "Ceramic Mug", "Wooden Bowl", "Linen Shirt", "Silver Necklace", 
  "Soy Candle", "Leather Wallet", "Wall Art", "Face Serum", 
  "Coffee Blend", "Woven Basket", "Knit Blanket", "Soap Bar"
]

const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", 
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
  "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte"
]

const SELLERS = [
  "Earth & Co", "Urban Artisan", "The Minimalist Maker", "Sunset Studios",
  "Heritage Crafts", "Nova Goods", "Pine & Oak", "Lumina Designs", 
  "Wandering Maker", "Terra Cotta Collective"
]

const REVIEW_COMMENTS = [
  "Absolutely love this! The quality is amazing.",
  "Good product for the price. Would buy again.",
  "Shipped quickly and arrived in perfect condition.",
  "It's okay, but slightly smaller than I expected.",
  "Beautiful craftsmanship. A wonderful addition to my home.",
  "Not my favorite. The color was a bit off.",
  "Five stars! Exceeded all my expectations.",
  "Very unique piece. Everyone asks me about it.",
  "Decent quality. Might order another one as a gift.",
  "Stunning! The maker really paid attention to detail."
]

const REVIEWERS = [
  "Alex J.", "Sam T.", "Jamie L.", "Chris P.", "Taylor R.", 
  "Jordan M.", "Casey S.", "Morgan E.", "Riley D.", "Avery K."
]

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateSlug(name: string): string {
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
  const shortId = Math.random().toString(36).substring(2, 8)
  return `${baseSlug}-${shortId}`
}

async function seedDatabase() {
  console.log('Starting database seed...')
  
  const products = []
  
  for (let i = 0; i < NUM_PRODUCTS; i++) {
    const adj = getRandomItem(ADJECTIVES)
    const noun = getRandomItem(NOUNS)
    const name = `${adj} ${noun}`
    
    products.push({
      name,
      slug: generateSlug(name),
      price: Math.floor(Math.random() * 190) + 10, // 10 to 199
      seller: getRandomItem(SELLERS),
      city: getRandomItem(CITIES),
      category: getRandomItem(CATEGORIES),
      description: `This beautiful ${name.toLowerCase()} is carefully crafted to bring joy and utility to your life. Made with high-quality materials and meticulous attention to detail.`,
      stock: Math.floor(Math.random() * 50) + 1, // 1 to 50
      // We will leave image_url empty so it falls back to the gradient, or we could add placeholder images.
    })
  }

  console.log(`Inserting ${products.length} products...`)
  
  // Insert products in batches
  const batchSize = 50
  const insertedProductIds = []
  
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize)
    const { data, error } = await supabase
      .from('products')
      .insert(batch)
      .select('id')
      
    if (error) {
      console.error('Error inserting products:', error)
      return
    }
    
    insertedProductIds.push(...(data || []).map(p => p.id))
    console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(products.length/batchSize)}`)
  }

  console.log(`Successfully inserted ${insertedProductIds.length} products.`)
  console.log('Generating reviews...')
  
  const reviews = []
  
  for (const productId of insertedProductIds) {
    // 1 to 5 reviews per product
    const numReviews = Math.floor(Math.random() * 5) + 1
    
    for (let i = 0; i < numReviews; i++) {
      // Skew ratings higher
      const rating = Math.random() > 0.8 ? 
        Math.floor(Math.random() * 2) + 2 : // 2-3 occasionally
        Math.floor(Math.random() * 2) + 4   // mostly 4-5
        
      reviews.push({
        product_id: productId,
        user_name: getRandomItem(REVIEWERS),
        rating: Math.min(5, Math.max(1, rating)),
        comment: Math.random() > 0.3 ? getRandomItem(REVIEW_COMMENTS) : null
      })
    }
  }

  console.log(`Inserting ${reviews.length} reviews...`)
  
  for (let i = 0; i < reviews.length; i += batchSize) {
    const batch = reviews.slice(i, i + batchSize)
    const { error } = await supabase
      .from('reviews')
      .insert(batch)
      
    if (error) {
      console.error('Error inserting reviews:', error)
      return
    }
  }

  console.log('Database seeding complete!')
}

seedDatabase().catch(console.error)
