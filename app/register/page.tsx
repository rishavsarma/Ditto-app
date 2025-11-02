"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validateForm() {
    const newErrors: Record<string, string> = {}
    
    if (!name.trim()) newErrors.name = "Name is required"
    else if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"
    
    const cleanedPhone = phone.replace(/[^0-9]/g, "")
    if (!cleanedPhone) newErrors.phone = "Phone number is required"
    else if (cleanedPhone.length !== 10) newErrors.phone = "Phone must be 10 digits"
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format"
    }
    
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function register() {
    if (!validateForm()) return

    setLoading(true)
    setMessage(null)

    // Mock registration flow. In a real app call API to create account.
    setTimeout(() => {
      setMessage({ text: "Account created successfully! Redirecting to login...", type: "success" })
      setTimeout(() => router.push("/"), 1200)
    }, 1000)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    register()
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E85A5A] to-[#d04545] mb-4 shadow-lg">
            <Image 
              src="/ditto-logo.svg" 
              alt="Ditto" 
              width={60} 
              height={60}
              className="brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E85A5A] to-[#ff7070] bg-clip-text text-transparent">
            Join Ditto
          </h1>
          <p className="text-muted-foreground mt-2">Create your account to get started</p>
        </div>

        {/* Card */}
        <div className="card-elev p-8 rounded-2xl backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">Create account</h2>
            <p className="text-sm text-muted-foreground">
              Sign up to discover exclusive deals
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full name *</label>
              <input
                type="text"
                className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-border'} bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E85A5A] focus:border-transparent transition-all`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
                }}
                placeholder="Enter your full name"
                disabled={loading}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone number *</label>
              <div className="flex gap-2">
                <div className="inline-flex items-center justify-center rounded-lg border border-border bg-muted/50 px-4 text-sm font-medium min-w-[60px]">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  className={`flex-1 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-border'} bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E85A5A] focus:border-transparent transition-all`}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "")
                    setPhone(val)
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }))
                  }}
                  placeholder="10-digit phone number"
                  disabled={loading}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            {/* Email (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-muted-foreground text-xs">(optional)</span>
              </label>
              <input
                type="email"
                className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-border'} bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E85A5A] focus:border-transparent transition-all`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
                }}
                placeholder="your.email@example.com"
                disabled={loading}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-border'} bg-background px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-[#E85A5A] focus:border-transparent transition-all`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }))
                  }}
                  placeholder="Create a strong password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
            </div>

            <button 
              type="submit"
              className="btn-primary mt-6 w-full py-3 text-base font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.type === "success" 
                ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                : "bg-red-500/10 text-red-600 border border-red-500/20"
            }`}>
              {message.text}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a className="text-[#E85A5A] font-semibold hover:underline" href="/">
                Login
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  )
}
