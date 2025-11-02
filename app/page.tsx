"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Page() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [loading, setLoading] = useState(false)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  function sendOtp() {
    const cleaned = phone.replace(/[^0-9]/g, "")
    if (cleaned.length < 10) {
      setMessage({ text: "Please enter a valid 10-digit phone number", type: "error" })
      return
    }
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true)
      setLoading(false)
      setMessage({ text: `OTP sent to +91 ${cleaned.slice(0, 5)}***${cleaned.slice(-2)} (use 1234)`, type: "success" })
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    }, 800)
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all 4 digits entered
    if (index === 3 && value && newOtp.every(d => d)) {
      verifyOtp(newOtp.join(""))
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  function verifyOtp(otpValue: string = otp.join("")) {
    setLoading(true)
    setTimeout(() => {
      if (otpValue === "1234") {
        setMessage({ text: "Login successful! Redirecting...", type: "success" })
        setTimeout(() => router.push("/home"), 600)
      } else {
        setMessage({ text: "Invalid OTP. Please try again (use 1234)", type: "error" })
        setOtp(["", "", "", ""])
        setLoading(false)
        otpRefs.current[0]?.focus()
      }
    }, 600)
  }

  function handlePhoneKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && phone.length >= 10) {
      sendOtp()
    }
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
            Welcome to Ditto
          </h1>
          <p className="text-muted-foreground mt-2">Your beauty & wellness partner</p>
        </div>

        {/* Card */}
        <div className="card-elev p-8 rounded-2xl backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">
              {otpSent ? "Verify OTP" : "Login"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {otpSent ? "Enter the 4-digit code sent to your phone" : "Enter your phone number to continue"}
            </p>
          </div>

          {!otpSent ? (
            <>
              <label className="block text-sm font-medium mb-2">Phone number</label>
              <div className="flex gap-2">
                <div className="inline-flex items-center justify-center rounded-lg border border-border bg-muted/50 px-4 text-sm font-medium min-w-[60px]">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  aria-label="phone"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E85A5A] focus:border-transparent transition-all"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "")
                    setPhone(val)
                    setMessage(null)
                  }}
                  onKeyDown={handlePhoneKeyDown}
                  placeholder="Enter 10-digit number"
                  disabled={loading}
                />
              </div>
              <button 
                className="btn-primary mt-6 w-full py-3 text-base font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                onClick={sendOtp}
                disabled={loading || phone.length < 10}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-3">Enter OTP</label>
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-14 h-14 text-center text-xl font-bold rounded-lg border-2 border-border bg-background focus:border-[#E85A5A] focus:outline-none focus:ring-2 focus:ring-[#E85A5A]/20 transition-all"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>
              
              <button 
                className="btn-primary mt-6 w-full py-3 text-base font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={() => verifyOtp()}
                disabled={loading || otp.some(d => !d)}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <button
                className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setOtpSent(false)
                  setOtp(["", "", "", ""])
                  setMessage(null)
                }}
                disabled={loading}
              >
                ← Change phone number
              </button>
            </>
          )}

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
              New to Ditto?{" "}
              <a className="text-[#E85A5A] font-semibold hover:underline" href="/register">
                Create an account
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  )
}
