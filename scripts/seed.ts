import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.error('❌  Missing or invalid SUPABASE_URL in .env.local')
  console.error('   Example: SUPABASE_URL=https://your-project-id.supabase.co')
  process.exit(1)
}

if (!supabaseServiceKey) {
  console.error('❌  Missing SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.error('   Find it in: Supabase Dashboard → Settings → API → service_role key')
  console.error('   ⚠️  Never expose this key to the browser or commit it to git!')
  process.exit(1)
}

// Use service role key to bypass Row Level Security for bulk inserts
const supabase = createClient(supabaseUrl, supabaseServiceKey)

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
  console.log('🌱 Starting database seed...')
  console.log(`   Target: ${supabaseUrl}`)
  console.log('')

  const products = []

  for (let i = 0; i < NUM_PRODUCTS; i++) {
    const adj = getRandomItem(ADJECTIVES)
    const noun = getRandomItem(NOUNS)
    const name = `${adj} ${noun}`

    products.push({
      name,
      slug: generateSlug(name),
      price: Math.floor(Math.random() * 190) + 10,
      seller: getRandomItem(SELLERS),
      city: getRandomItem(CITIES),
      category: getRandomItem(CATEGORIES),
      description: `This beautiful ${name.toLowerCase()} is carefully crafted to bring joy and utility to your life. Made with high-quality materials and meticulous attention to detail.`,
      stock: Math.floor(Math.random() * 50) + 1,
    })
  }

  console.log(`📦 Inserting ${products.length} products...`)

  const batchSize = 50
  const insertedProductIds: string[] = []

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize)
    const { data, error } = await supabase
      .from('products')
      .insert(batch)
      .select('id')

    if (error) {
      console.error('❌  Error inserting products:', error.message)
      console.error('   Details:', error.details)
      process.exit(1)
    }

    insertedProductIds.push(...(data || []).map((p: { id: string }) => p.id))
    const batchNum = Math.floor(i / batchSize) + 1
    const totalBatches = Math.ceil(products.length / batchSize)
    console.log(`   Batch ${batchNum}/${totalBatches} done (${insertedProductIds.length} products)`)
  }

  console.log(`✅  Inserted ${insertedProductIds.length} products successfully.`)
  console.log('')
  console.log('⭐  Generating reviews...')

  const reviews = []

  for (const productId of insertedProductIds) {
    const numReviews = Math.floor(Math.random() * 5) + 1

    for (let i = 0; i < numReviews; i++) {
      const rating = Math.random() > 0.8
        ? Math.floor(Math.random() * 2) + 2  // 2-3 occasionally
        : Math.floor(Math.random() * 2) + 4  // mostly 4-5

      reviews.push({
        product_id: productId,
        user_name: getRandomItem(REVIEWERS),
        rating: Math.min(5, Math.max(1, rating)),
        comment: Math.random() > 0.3 ? getRandomItem(REVIEW_COMMENTS) : null
      })
    }
  }

  console.log(`   Inserting ${reviews.length} reviews...`)

  for (let i = 0; i < reviews.length; i += batchSize) {
    const batch = reviews.slice(i, i + batchSize)
    const { error } = await supabase.from('reviews').insert(batch)

    if (error) {
      console.error('❌  Error inserting reviews:', error.message)
      process.exit(1)
    }
  }

  console.log(`✅  Inserted ${reviews.length} reviews successfully.`)
  console.log('')

  // Confirm row counts
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: reviewCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })

  console.log('📊  Final row counts:')
  console.log(`   products table: ${productCount} rows`)
  console.log(`   reviews  table: ${reviewCount} rows`)
  console.log('')
  console.log('🎉  Database seeding complete!')
}

seedDatabase().catch((err) => {
  console.error('❌  Unexpected error:', err)
  process.exit(1)
})
