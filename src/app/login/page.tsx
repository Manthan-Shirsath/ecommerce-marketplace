"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = e.target as HTMLFormElement
      const email = (form.elements.namedItem("email") as HTMLInputElement).value

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      if (!res.ok) throw new Error("Login failed")

      const data = await res.json()
      // In a real app we'd save this to a global AuthProvider or cookies
      window.localStorage.setItem("authToken", data.token)
      window.localStorage.setItem("authUser", JSON.stringify(data.user))

      setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border/70 bg-card p-8 shadow-sm">
          {success ? (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="size-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
                <p className="text-sm text-muted-foreground">
                  We sent a magic link to sign in to your dashboard.
                </p>
              </div>
              <Link href="/" className="mt-4 w-full">
                <Button variant="outline" className="w-full">
                  Back to home
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col space-y-2 text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock className="size-5" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email to sign in
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    required
                    type="email"
                    className="h-11"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? "Sending link..." : "Sign In with Email"}
                </Button>
              </form>
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/sell" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
