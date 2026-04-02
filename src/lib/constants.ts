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
  image_url?: string
}

export type MarketplaceReview = {
  id: string
  product_id: string
  user_name: string
  rating: number
  comment?: string
  created_at: string
}

export const navigation = [
  { label: "New arrivals", href: "/search?sort=newest" },
  { label: "Collections", href: "/#categories" },
  { label: "Best sellers", href: "/search?sort=rating" },
  { label: "Gift guide", href: "/search?q=gift" },
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
    slug: "homemade-snacks",
    description: "Regional treats, roasted mixes, and small-batch pantry favorites.",
    itemCount: "86 items",
    icon: Cookie,
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Handpicked everyday wear, festive looks, and artisan-made fabrics.",
    itemCount: "132 items",
    icon: Shirt,
  },
  {
    name: "Local Crafts",
    slug: "local-crafts",
    description: "Handmade decor, pottery, stitched goods, and one-of-a-kind gifts.",
    itemCount: "74 items",
    icon: Paintbrush,
  },
  {
    name: "Beauty Products",
    slug: "beauty-products",
    description: "Natural skincare, bath essentials, and small-batch self-care products.",
    itemCount: "58 items",
    icon: Sparkles,
  },
]



export const valueProps = [
  {
    title: "Authentic Products",
    description: "Every product is sourced directly from small-town makers and home businesses.",
    icon: Truck,
  },
  {
    title: "Support Local Sellers",
    description: "Your purchase directly supports independent sellers and artisans.",
    icon: RotateCcw,
  },
  {
    title: "Carefully Curated",
    description: "We review products to ensure quality and authenticity.",
    icon: LockKeyhole,
  },
]

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "/search?sort=newest" },
      { label: "Bundles", href: "/search?q=bundle" },
      { label: "Best sellers", href: "/search?sort=rating" },
      { label: "Gift cards", href: "/search?q=gift" }
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Journal", href: "/" },
      { label: "Stockists", href: "/" },
      { label: "Careers", href: "/" }
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/" },
      { label: "Returns", href: "/" },
      { label: "FAQ", href: "/" },
      { label: "Contact", href: "/" }
    ],
  },
]

export const trustNotes = [
  {
    title: "Verified local sellers",
    description: "We feature products from real small-town businesses and independent makers.",
    icon: Sparkles,
  },
  {
    title: "Regional specialties",
    description: "Discover handmade goods, homemade foods, and cultural crafts from across India.",
    icon: PackageCheck,
  },
]
