import { loginUser } from "../services/authService"

export async function loginController(req: Request) {
  try {
    const body = await req.json()
    
    if (!body.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 })
    }

    const { user, token } = await loginUser(body)
    
    return new Response(JSON.stringify({ user, token }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 })
  }
}
