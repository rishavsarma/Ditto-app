"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

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
        <Card className="backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">
              {otpSent ? "Verify OTP" : "Login"}
            </CardTitle>
            <CardDescription>
              {otpSent ? "Enter the 4-digit code sent to your phone" : "Enter your phone number to continue"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!otpSent ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <div className="flex gap-2">
                    <div className="inline-flex items-center justify-center rounded-lg border border-border bg-muted/50 px-4 text-sm font-medium min-w-[60px]">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "")
                        setPhone(val)
                        setMessage(null)
                      }}
                      onKeyDown={handlePhoneKeyDown}
                      placeholder="Enter 10-digit number"
                      disabled={loading}
                      className="flex-1"
                    />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={sendOtp}
                  disabled={loading || phone.length < 10}
                  size="lg"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <Label>Enter OTP</Label>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-14 h-14 text-center text-xl font-bold"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        disabled={loading}
                      />
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => verifyOtp()}
                  disabled={loading || otp.some(d => !d)}
                  size="lg"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setOtpSent(false)
                    setOtp(["", "", "", ""])
                    setMessage(null)
                  }}
                  disabled={loading}
                >
                  ← Change phone number
                </Button>
              </>
            )}

            {message && (
              <Alert variant={message.type === "success" ? "default" : "destructive"}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <div className="pt-4 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                New to Ditto?{" "}
                <a className="text-primary font-semibold hover:underline" href="/register">
                  Create an account
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  )
}
