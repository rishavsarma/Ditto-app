"use client"

import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { stores } from "@/lib/data"
import { useState, use } from "react"

export default function StoreDetail({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const s = stores.find((x) => x.slug === resolvedParams.slug)
  const [activeTab, setActiveTab] = useState("Offers")
  
  if (!s) return notFound()

  const tabs = ["About", "Direction", "Offers", "Call now"]

  // Top items for offers section
  const topItems = [
    { name: "Swedish Massage 30 min", discount: "30%" },
    { name: "Couple SPA", discount: "25%" },
    { name: "Manicure", discount: "20%" },
    { name: "Pedicure", discount: "15%" },
  ]

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* Hero Image with Back Button */}
      <div className="relative h-64 bg-muted">
        <img 
          src={s.heroImage || "/placeholder.svg"} 
          alt={`${s.name} cover`} 
          className="h-full w-full object-cover" 
        />
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border shadow-lg hover:bg-background transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* <button 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border shadow-lg hover:bg-background transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}
      </div>

      {/* Business Info Section */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{s.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>{s.distanceKm} km</span>
              <span>•</span>
              <span className="text-green-600 font-medium">Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6">
        {activeTab === "Offers" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Offers, Menu, Facility</h2>
            
            {/* Top Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Top Items:</h3>
              <div className="space-y-3">
                {topItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-primary font-semibold">{item.discount} OFF</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "About" && (
          <div>
            <h2 className="text-xl font-bold mb-4">About {s.name}</h2>
            <p className="text-muted-foreground mb-4">
              {s.area}, {s.city}
            </p>
            <p className="text-muted-foreground">
              {s.categories.join(" • ")}
            </p>
          </div>
        )}

        {activeTab === "Direction" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Direction</h2>
            <p className="text-muted-foreground mb-4">
              {s.distanceKm} km away from your location
            </p>
            <p className="text-sm text-muted-foreground">
              {s.area}, {s.city}
            </p>
          </div>
        )}

        {activeTab === "Call now" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              Click the button below to call {s.name}
            </p>
          </div>
        )}
      </div>

      {/* Operating Hours */}
      <div className="px-4 py-4 border-t border-border">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">50% Off:</span>
            <span className="font-medium">12 AM - 5 PM</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">30% Off:</span>
            <span className="font-medium">5 PM - 9 PM</span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        <Link 
          href={`/stores/${s.slug}/pay`} 
          className="block w-full py-4 bg-primary text-white text-center font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg"
        >
          Pay Bill
        </Link>
      </div>
    </main>
  )
}
