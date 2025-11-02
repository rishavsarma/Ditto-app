"use client"

import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { stores } from "@/lib/data"
import { computeSavings, inr } from "@/lib/format"
import { useState, useEffect } from "react"
import { use } from "react"

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

  const customerName = resolvedSearchParams.name || "Guest"
  const billAmount = Math.max(0, Number(resolvedSearchParams.amount ?? 0))
  const discountPercent = Number(resolvedSearchParams.discount ?? s.offerPercent)
  const walletAmount = 25
  
  const discountAmount = Math.floor((billAmount * discountPercent) / 100)
  const afterDiscount = billAmount - discountAmount
  const totalToPay = Math.max(0, afterDiscount - walletAmount)
  const totalSavings = discountAmount + walletAmount

  const [acceptedTerms, setAcceptedTerms] = useState(false)

  return (
    <main className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-4 py-4 border-b border-border">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

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

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Bill amount</h2>
          <div className="p-6 rounded-xl border-2 border-border bg-card">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold">₹{billAmount}</span>
              <span className="text-lg text-muted-foreground line-through">₹{billAmount}</span>
            </div>
            {walletAmount > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Wallet Amount:</span>
                <span className="font-semibold text-green-600 dark:text-green-500">-₹{walletAmount}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
          <div className="text-sm text-muted-foreground mb-2">Amount to pay</div>
          <div className="text-5xl font-bold text-primary">₹{totalToPay}</div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">Bill Summary</h3>
          <div className="p-4 rounded-xl border border-border bg-card space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bill amt</span>
              <span className="font-medium">₹{billAmount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Discount ({discountPercent}%)</span>
              <span className="font-medium text-green-600 dark:text-green-500">-₹{discountAmount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Wallet</span>
              <span className="font-medium text-green-600 dark:text-green-500">-₹{walletAmount}</span>
            </div>
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
          disabled={!acceptedTerms}
          onClick={() => alert('Redirecting to payment gateway...')}
          className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
        >
          <span>Pay ₹{totalToPay}</span>
          <span>→</span>
          <span className="text-sm opacity-90">Payment Gateway</span>
        </button>
      </div>
    </main>
  )
}
