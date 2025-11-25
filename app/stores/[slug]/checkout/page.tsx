"use client"

import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { stores } from "@/lib/data"
import { computeSavings, inr } from "@/lib/format"
import { useState, useEffect } from "react"
import { use } from "react"
import { AppHeader } from "@/components/app-header"

// Function to get current time-based discount
function getTimeBasedDiscount(): { discount: number; timeSlot: string } {
  const hour = new Date().getHours()
  
  if (hour >= 0 && hour < 17) {
    return { discount: 50, timeSlot: "12 AM - 5 PM" }
  } else if (hour >= 17 && hour < 21) {
    return { discount: 30, timeSlot: "5 PM - 9 PM" }
  } else {
    return { discount: 20, timeSlot: "9 PM - 12 AM" }
  }
}

export default function Checkout({
  params,
  searchParams,
}: { 
  params: Promise<{ slug: string }>
  searchParams: Promise<{ amount?: string; name?: string; offer?: string; discount?: string }> 
}) {
  const router = useRouter()
  const resolvedParams = use(params)
  const resolvedSearchParams = use(searchParams)
  
  const s = stores.find((x) => x.slug === resolvedParams.slug)
  if (!s) return notFound()

  const customerName = resolvedSearchParams.name || "Rishav"
  const availableWalletBalance = 250 // User's total wallet balance
  
  const [billAmount, setBillAmount] = useState(resolvedSearchParams.amount || "")
  const [walletInputAmount, setWalletInputAmount] = useState("")
  const [walletMode, setWalletMode] = useState<"full" | "flat" | "percent">("full")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  
  // Get time-based discount
  const timeDiscount = getTimeBasedDiscount()
  const discountPercent = timeDiscount.discount
  
  const amount = Math.max(0, Number(billAmount))
  const discountAmount = Math.floor((amount * discountPercent) / 100)
  const afterDiscount = amount - discountAmount
  
  // Calculate wallet amount based on mode
  let walletAmount = 0
  if (walletMode === "full") {
    walletAmount = Math.min(availableWalletBalance, afterDiscount)
  } else if (walletMode === "flat" && walletInputAmount) {
    walletAmount = Math.min(
      Number(walletInputAmount),
      availableWalletBalance,
      afterDiscount
    )
  } else if (walletMode === "percent" && walletInputAmount) {
    const percentAmount = Math.floor((availableWalletBalance * Number(walletInputAmount)) / 100)
    walletAmount = Math.min(percentAmount, availableWalletBalance, afterDiscount)
  }
  
  const totalToPay = Math.max(0, afterDiscount - walletAmount)
  const totalSavings = discountAmount + walletAmount

  return (
    <main className="min-h-screen bg-background flex flex-col pb-24">
      <AppHeader variant="back" title="Checkout" />

      <div className="flex-1 px-4 py-6">
        <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <div className="font-medium text-sm text-amber-900 dark:text-amber-100">Correct store?</div>
              <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Please ensure you are at {s.name}, {s.area}
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mb-6 p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-lg font-bold text-primary">
                {customerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Customer</div>
              <div className="font-semibold">{customerName}</div>
            </div>
          </div>
        </div>

        {/* Bill Amount Input */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-3">Enter bill amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-semibold text-muted-foreground">
              ₹
            </span>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="1000"
              className="w-full pl-14 pr-4 py-5 rounded-xl border-2 border-border bg-card text-3xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
        
        {/* Time-based discount info */}
        {amount > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900 dark:text-green-100">Time-Based Offer Active!</div>
                <div className="text-xs text-green-700 dark:text-green-300 mt-0.5">
                  {timeDiscount.timeSlot} • {discountPercent}% OFF Applied
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {discountPercent}%
              </div>
            </div>
          </div>
        )}

        {/* Wallet Section */}
        <div className="mb-6">
          <div className="p-4 rounded-xl border-2 border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium">Wallet Balance</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">₹{availableWalletBalance}</div>
              </div>
            </div>

            {/* Mode Selection */}
            <div className="mb-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">Select wallet usage</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setWalletMode("full")
                    setWalletInputAmount("")
                  }}
                  className={`py-2.5 px-3 rounded-lg font-semibold text-sm transition-all border-2 ${
                    walletMode === "full"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-background text-foreground border-border hover:border-purple-300"
                  }`}
                >
                  Full
                </button>
                <button
                  onClick={() => {
                    setWalletMode("flat")
                    setWalletInputAmount("")
                  }}
                  className={`py-2.5 px-3 rounded-lg font-semibold text-sm transition-all border-2 ${
                    walletMode === "flat"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-background text-foreground border-border hover:border-purple-300"
                  }`}
                >
                  Flat (₹)
                </button>
                <button
                  onClick={() => {
                    setWalletMode("percent")
                    setWalletInputAmount("")
                  }}
                  className={`py-2.5 px-3 rounded-lg font-semibold text-sm transition-all border-2 ${
                    walletMode === "percent"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-background text-foreground border-border hover:border-purple-300"
                  }`}
                >
                  % of Wallet
                </button>
              </div>
            </div>

            {/* Input for Flat or Percent modes */}
            {(walletMode === "flat" || walletMode === "percent") && (
              <div className="mb-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
                    {walletMode === "flat" ? "₹" : "%"}
                  </span>
                  <input
                    type="number"
                    value={walletInputAmount}
                    onChange={(e) => setWalletInputAmount(e.target.value)}
                    placeholder={walletMode === "flat" ? "Enter amount" : "Enter %"}
                    max={walletMode === "flat" ? availableWalletBalance : 100}
                    className="w-full pl-9 pr-3 py-3 rounded-lg border-2 border-border bg-background text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {walletMode === "flat" 
                    ? `Max: ₹${Math.min(availableWalletBalance, afterDiscount || 0)}`
                    : `Enter % of your wallet (₹${availableWalletBalance})`}
                </div>
              </div>
            )}

            {/* Wallet Deduction Display */}
            {walletAmount > 0 && (
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Wallet deduction</span>
                  <span className="font-semibold text-green-600 dark:text-green-500">-₹{walletAmount}</span>
                </div>
                {walletMode === "percent" && walletInputAmount && (
                  <div className="text-xs text-muted-foreground">
                    {walletInputAmount}% of ₹{availableWalletBalance} = ₹{Math.floor((availableWalletBalance * Number(walletInputAmount)) / 100)}
                  </div>
                )}
                {walletMode === "full" && (
                  <div className="text-xs text-muted-foreground">
                    Using {walletAmount === availableWalletBalance ? 'full' : 'available'} wallet balance
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {amount > 0 && (
          <>
            <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
              <div className="text-sm text-muted-foreground mb-2">Amount to pay</div>
              <div className="text-5xl font-bold text-primary">₹{totalToPay}</div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Bill Summary</h3>
              <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bill amt</span>
                  <span className="font-medium">₹{amount}</span>
                </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Discount ({discountPercent}%)</span>
              <span className="font-medium text-green-600 dark:text-green-500">-₹{discountAmount}</span>
            </div>
            {walletAmount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wallet</span>
                <span className="font-medium text-green-600 dark:text-green-500">-₹{walletAmount}</span>
              </div>
            )}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="font-semibold">To be paid</span>
              <span className="text-xl font-bold">₹{totalToPay}</span>
            </div>
            <div className="pt-2 border-t border-dashed border-border flex items-center justify-between">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">Save/You</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-500">₹{totalSavings}</span>
            </div>
          </div>
        </div>
          </>
        )}

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Terms & Condition</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <p>Payment is non-refundable once processed</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <p>Offers are subject to availability and terms</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <p>Please verify the bill amount before payment</p>
            </div>
          </div>
          
          <label className="flex items-start gap-3 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
            />
            <span className="text-sm">I accept the terms and conditions</span>
          </label>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        <button
          disabled={!acceptedTerms || !amount || amount <= 0}
          onClick={() => alert('Redirecting to payment gateway...')}
          className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
        >
          {amount > 0 ? (
            <>
              <span>Pay ₹{totalToPay}</span>
              <span>→</span>
              <span className="text-sm opacity-90">Payment Gateway</span>
            </>
          ) : (
            <span>Enter bill amount to proceed</span>
          )}
        </button>
      </div>
    </main>
  )
}
