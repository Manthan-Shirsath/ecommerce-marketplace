import { SignJWT, jwtVerify } from "jose"
import { LoginPayload } from "../models/types"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-local-key"
const key = new TextEncoder().encode(JWT_SECRET)

export async function loginUser(payload: LoginPayload) {
  // In a real system, you would check repository for hash match
  // const user = await userRepository.findByEmail(payload.email)
  if (!payload.email) {
    throw new Error("Email is required for login")
  }

  // Generate JWT token
  const token = await new SignJWT({ email: payload.email, role: "user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key)

  return {
    user: { id: "user-123", email: payload.email }, // Mocked DB resolving
    token
  }
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key)
    return payload
  } catch (error) {
    throw new Error("Invalid or expired token")
  }
}
