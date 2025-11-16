"use client"

import { useState, use } from "react"
import { notFound, useRouter } from "next/navigation"
import { stores } from "@/lib/data"
import { AppHeader } from "@/components/app-header"

type Offer = {
  id: string
  title: string
  discount: number
  maxDiscount?: number
}

export default function EnterAmount({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [amount, setAmount] = useState("")
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const s = stores.find((x) => x.slug === resolvedParams.slug)
  if (!s) return notFound()

  // User info from login (hardcoded for now)
  const userName = "Rishav"
  const userLocation = s.area

  const offers: Offer[] = [
    { id: "1", title: `Flat ${s.offerPercent}% off`, discount: s.offerPercent },
    { id: "2", title: "10% OFF", discount: 10, maxDiscount: 500 },
    { id: "3", title: "15% OFF", discount: 15, maxDiscount: 300 },
    { id: "4", title: "₹100 OFF", discount: 100 },
  ]

  const handleProceed = () => {
    if (amount) {
      const offer = selectedOffer ? offers.find(o => o.id === selectedOffer) : null
      router.push(`/stores/${s.slug}/checkout?amount=${amount}&name=${userName}&offer=${selectedOffer || ''}&discount=${offer?.discount || 0}`)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader variant="back" title="Bill Pay" />

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Bill Pay Page</h1>

        {/* User Info Card */}
        <div className="mb-6 p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-lg font-bold text-primary">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-semibold">{userName}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-border">
            <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="font-medium">{userLocation}</div>
            </div>
          </div>
        </div>

        {/* Bill Amount Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Enter bill amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-border bg-background text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Available Offers */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Available Offers (Select one)</label>
          <div className="space-y-3">
            {offers.map((offer) => (
              <button
                key={offer.id}
                onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedOffer === offer.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOffer === offer.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}>
                      {selectedOffer === offer.id && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{offer.title}</div>
                      {offer.maxDiscount && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Max discount: ₹{offer.maxDiscount}
                        </div>
                      )}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4 border-t border-border bg-background/95 backdrop-blur-sm">
        <button
          onClick={handleProceed}
          disabled={!amount}
          className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Proceed →
        </button>
      </div>
    </main>
  )
}
