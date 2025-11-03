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
  const [showAllOffers, setShowAllOffers] = useState(false)
  
  if (!s) return notFound()

  const tabs = ["Offers", "About"]

  // Time-based offers
  const timeOffers = [
    { time: "12 AM - 5 PM", discount: "50%" },
    { time: "5 PM - 9 PM", discount: "30%" },
  ]

  // Top items for offers section
  const topItems = [
    { name: "Swedish Massage 30 min", discount: "30%" },
    { name: "Couple SPA", discount: "25%" },
    { name: "Manicure", discount: "20%" },
    { name: "Pedicure", discount: "15%" },
    { name: "Hair Cut & Styling", discount: "25%" },
    { name: "Facial Treatment", discount: "35%" },
  ]

  const displayedOffers = showAllOffers ? topItems : topItems.slice(0, 3)

  // Gallery images
  const galleryImages = [
    s.heroImage,
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
  ]

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* Photo Gallery Section */}
      <div className="relative bg-black">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Bookmark and Share Buttons */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-0.5 h-[400px]">
          {/* Large Left Image */}
          <div className="relative col-span-1 row-span-2">
            <img 
              src={galleryImages[0]} 
              alt="Gallery 1" 
              className="h-full w-full object-cover" 
            />
          </div>
          
          {/* Top Right Image */}
          <div className="relative">
            <img 
              src={galleryImages[1]} 
              alt="Gallery 2" 
              className="h-full w-full object-cover" 
            />
          </div>

          {/* Bottom Right - Split into 2 */}
          <div className="relative">
            <img 
              src={galleryImages[2]} 
              alt="Gallery 3" 
              className="h-full w-full object-cover" 
            />
          </div>
        </div>

        {/* View Gallery Button */}
        <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg">
          View gallery
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-8 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Business Info Section */}
      <div className="px-5 py-6 bg-background">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-3">
            <h1 className="text-2xl font-bold mb-2 leading-tight">{s.name}</h1>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span>{s.area}, {s.city}</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {/* Rating Badge */}
          <div className="bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-1.5 font-bold shrink-0">
            <span className="text-base">4.4</span>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-normal">286</span>
          </div>
        </div>

        {/* Distance and Price */}
        <div className="text-sm text-muted-foreground mb-3">
          {s.distanceKm} km away • ₹1300 for two
        </div>

        {/* Opening Status */}
        <button className="flex items-center gap-2 text-sm text-red-600 font-medium mb-5 hover:text-red-700 transition-colors">
          <span>Closed</span>
          <span>•</span>
          <span>Opens on 04 Nov</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Contact Details */}
        <div className="space-y-3 border-t border-border pt-5 grid grid-cols-2 gap-4">
          {/* Phone */}
          <button className="flex items-center gap-3 text-sm w-full hover:bg-muted/30 -mx-2 px-2  rounded-lg transition-colors">
            <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-foreground font-medium">9980054452</span>
          </button>

          {/* Email */}
          <button className="flex items-center gap-3 text-sm w-full hover:bg-muted/30 -mx-2 px-2  rounded-lg transition-colors">
            <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-foreground font-medium">mail@gmail.com</span>
          </button>

          {/* Show Map */}
          <button className="flex items-center gap-3 text-sm text-primary font-semibold w-full hover:bg-primary/10 -mx-2 px-2  rounded-lg transition-colors">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Show map</span>
          </button>

          {/* Salon Type */}
          <div className="flex items-center gap-3 text-sm -mx-2 px-2 ">
            <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-primary font-semibold">Unisex Saloon</span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="px-5 py-4 border-y border-border bg-background/50">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-6">
        {activeTab === "Offers" && (
          <div>
            {/* Time-Based Offers */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">Time-Based Offers</h2>
              <div className="space-y-3">
                {timeOffers.map((offer, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 hover:border-primary/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="font-medium text-sm">{offer.time}</span>
                    </div>
                    <span className="text-primary font-bold text-sm">{offer.discount} OFF</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Offers */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Top Offers</h2>
              <div className="space-y-3">
                {displayedOffers.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 hover:border-primary/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <span className="text-primary font-bold text-sm ml-3 shrink-0">{item.discount} OFF</span>
                  </div>
                ))}
              </div>
              
              {/* More Button */}
              {!showAllOffers && topItems.length > 3 && (
                <button
                  onClick={() => setShowAllOffers(true)}
                  className="w-full mt-4 py-3.5 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-semibold text-muted-foreground hover:text-primary"
                >
                  + {topItems.length - 3} more offers
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "About" && (
          <div>
            <h2 className="text-lg font-bold mb-4">About {s.name}</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              {s.area}, {s.city}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {s.categories.join(" • ")}
            </p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-background/98 backdrop-blur-md border-t border-border shadow-2xl">
        <Link 
          href={`/stores/${s.slug}/pay`} 
          className="block w-full py-4 bg-primary text-white text-center font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg text-base"
        >
          Pay Bill
        </Link>
      </div>
    </main>
  )
}
