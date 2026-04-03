import { fetchProducts, fetchProductDetails } from "../services/productService"

export async function getProductsController(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const filters = {
      q: searchParams.get('q'),
      category: searchParams.get('category'),
      seller: searchParams.get('seller'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      sort: searchParams.get('sort')
    }

    const products = await fetchProducts(filters)
    
    return new Response(JSON.stringify(products), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
