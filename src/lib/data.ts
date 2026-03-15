import {
  Cookie,
  LockKeyhole,
  PackageCheck,
  Paintbrush,
  RotateCcw,
  Shirt,
  Sparkles,
  Truck,
} from "lucide-react"

export type MarketplaceProduct = {
  id: string
  slug: string
  name: string
  price: number
  seller: string
  city: string
  category: string
  description: string
  stock: number
  rating: number
}

export const navigation = [
  { label: "New arrivals", href: "#" },
  { label: "Collections", href: "#" },
  { label: "Best sellers", href: "#" },
  { label: "Gift guide", href: "#" },
]

export const heroStats = [
  { value: "2-3 days", label: "average shipping time" },
  { value: "4.8/5", label: "customer rating from early buyers" },
  { value: "50+", label: "unique local products" },
]

export const heroHighlights = [
  {
    title: "Homemade mango pickle",
    subtitle: "Traditional recipe from a family kitchen",
    price: 9,
    color: "from-orange-600 to-amber-500",
  },
  {
    title: "Handwoven cotton dupatta",
    subtitle: "Crafted by local textile artisans",
    price: 18,
    color: "from-rose-500 to-orange-400",
  },
]

export const categories = [
  {
    name: "Homemade Snacks",
    description: "Regional treats, roasted mixes, and small-batch pantry favorites.",
    itemCount: "86 items",
    icon: Cookie,
  },
  {
    name: "Clothing",
    description: "Handpicked everyday wear, festive looks, and artisan-made fabrics.",
    itemCount: "132 items",
    icon: Shirt,
  },
  {
    name: "Local Crafts",
    description: "Handmade decor, pottery, stitched goods, and one-of-a-kind gifts.",
    itemCount: "74 items",
    icon: Paintbrush,
  },
  {
    name: "Beauty Products",
    description: "Natural skincare, bath essentials, and small-batch self-care products.",
    itemCount: "58 items",
    icon: Sparkles,
  },
]

export const featuredProducts: MarketplaceProduct[] = [
  {
    id: "snack-001",
    slug: "jaggery-peanut-chikki",
    name: "Jaggery Peanut Chikki",
    price: 8,
    seller: "Anita's Kitchen",
    city: "Pune",
    category: "Homemade Snacks",
    description:
      "A crunchy homemade sweet made with roasted peanuts and rich jaggery, packed in small batches for a fresh and traditional snack.",
    stock: 24,
    rating: 4.9,
  },
  {
    id: "cloth-014",
    slug: "block-print-cotton-kurta",
    name: "Block Print Cotton Kurta",
    price: 32,
    seller: "Sundar Weaves",
    city: "Jaipur",
    category: "Clothing",
    description:
      "A breathable cotton kurta featuring hand-finished block print patterns inspired by Jaipur's textile traditions.",
    stock: 11,
    rating: 4.7,
  },
  {
    id: "craft-007",
    slug: "handpainted-terracotta-vase",
    name: "Handpainted Terracotta Vase",
    price: 21,
    seller: "Mitti Studio",
    city: "Kolkata",
    category: "Local Crafts",
    description:
      "A handpainted terracotta vase shaped and decorated by local artisans, ideal for fresh flowers or as a warm decorative accent.",
    stock: 7,
    rating: 4.8,
  },
  {
    id: "beauty-022",
    slug: "rose-saffron-face-oil",
    name: "Rose Saffron Face Oil",
    price: 18,
    seller: "Nirva Naturals",
    city: "Bengaluru",
    category: "Beauty Products",
    description:
      "A lightweight face oil blended with rose and saffron extracts to support a nourishing skincare ritual with a natural glow.",
    stock: 19,
    rating: 4.9,
  },
]

export const valueProps = [
  {
    title: "Authentic Products",
    description:
      "Every product is sourced directly from small-town makers and home businesses.",
    icon: Truck,
  },
  {
    title: "Support Local Sellers",
    description:
      "Your purchase directly supports independent sellers and artisans.",
    icon: RotateCcw,
  },
  {
    title: "Carefully Curated",
    description:
      "We review products to ensure quality and authenticity.",
    icon: LockKeyhole,
  },
]

export const footerGroups = [
  {
    title: "Shop",
    links: ["New arrivals", "Bundles", "Best sellers", "Gift cards"],
  },
  {
    title: "Company",
    links: ["About", "Journal", "Stockists", "Careers"],
  },
  {
    title: "Support",
    links: ["Shipping", "Returns", "FAQ", "Contact"],
  },
]

export const trustNotes = [
  {
    title: "Verified local sellers",
    description:
      "We feature products from real small-town businesses and independent makers.",
    icon: Sparkles,
  },
  {
    title: "Regional specialties",
    description:
      "Discover handmade goods, homemade foods, and cultural crafts from across India.",
    icon: PackageCheck,
  },
]

export function getProductBySlug(slug: string) {
  return featuredProducts.find((product) => product.slug === slug)
}

export function getProductById(id: string) {
  return featuredProducts.find((product) => product.id === id)
}
