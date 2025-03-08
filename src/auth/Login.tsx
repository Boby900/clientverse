import type React from "react"

import { Button } from "@/components/ui/button"
import { z, ZodError } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Mail } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"
import { OTPInput } from "@/components/otp-input"

const LoginSchema = z.object({
  email: z.string().email("Invalid email address").min(5, "Email must be at least 5 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
})

export const Login = () => {
  const [error, setError] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [email, setEmail] = useState("") // Store email after signup
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    }
    try {
      const validatedData = LoginSchema.parse(data)
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      })

      const result = await response.json()

      if (response.ok) {
        setEmail(validatedData.email) // Store the email
        setVerificationSent(true)
        setError("")
      } else {
        setError(result.message)
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ")
        setError(errorMessages)
      } else {
        console.error("Error:", error)
        setError("An unexpected error occurred")
      }
    }
  }

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Use the stored email
          code: verificationCode,
        }),
      })

      if (response.ok) {
        navigate("/dashboard")
      } else {
        const result = await response.json()
        setError(result.message || "Invalid verification code.")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setError("An unexpected error occurred during verification.")
    }
  }

  const githubLoginUrl = `${apiUrl}/api/auth/github/login`
  const googleLoginUrl = `${apiUrl}/api/auth/google/login`

  return (
    <div className="flex min-h-screen p-2 m-2">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?q=80&w=2070"
          alt="Abstract office workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg text-white/90">Your workspace is waiting for you</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-[400px] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login to your account</CardTitle>
            <CardDescription className="text-center">Enter your email below to login to your account</CardDescription>
            {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Mail className="mr-2 h-4 w-4" />
                Log In with Email
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a href={githubLoginUrl} className="w-full">
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </a>
              <a href={googleLoginUrl} className="w-full">
                <Button variant="outline" className="w-full">
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Google
                </Button>
              </a>
            </div>
            {verificationSent && (
              <div className="mt-6 space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-gray-400">
                    A verification code has been sent to your email address
                  </p>
                  <p className="text-xs text-gray-500">Please enter the 8-digit code below</p>
                </div>
                <OTPInput value={verificationCode} onChange={setVerificationCode} length={8} />
                <Button
                  onClick={handleVerifyCode}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={verificationCode.length !== 8}
                >
                  Verify Code
                </Button>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup">
                <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:underline">
                  Sign Up
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login

