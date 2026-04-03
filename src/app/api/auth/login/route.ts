import { loginController } from "@/backend/controllers/authController"

export async function POST(request: Request) {
  return loginController(request)
}
