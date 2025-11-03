"use client";

import { AppHeader } from "@/components/app-header";
import { stores } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StoresList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Nearest", "Top Rated", "Most Popular"];

  const filteredStores = searchQuery
    ? stores.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.area.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stores;

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <AppHeader activeTab="STORES" />

      {/* Back Button */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => router.push('/home')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to Home</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Exclusive Offers Banner */}
      <div className="mb-8">
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-lg font-bold">Exclusive Offers</h2>
        </div>

        <div
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2"
          style={{ scrollPaddingLeft: "1rem" }}
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="min-w-[320px] snap-start rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6"
            >
              <div className="text-xs text-primary font-semibold mb-2">
                LIMITED TIME
              </div>
              <h3 className="text-lg font-bold mb-2">Flat {20 + n * 5}% OFF</h3>
              <p className="text-sm text-muted-foreground mb-4">
                On premium salon services
              </p>
              <button className="btn-primary w-full text-sm py-2">
                Claim Offer
              </button>
            </div>
          ))}
          <div className="w-4 shrink-0" />
        </div>
      </div>
      {/* Featured Salons Section */}
      {/* <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-4">
          <h2 className="text-lg font-bold">Featured Salons</h2>
          <span className="text-sm text-muted-foreground">
            {stores.length} nearby
          </span>
        </div>

        <div
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2"
          style={{ scrollPaddingLeft: "1rem" }}
        >
          {stores.slice(0, 3).map((store) => (
            <Link
              key={`featured-${store.slug}`}
              href={`/stores/${store.slug}`}
              className="min-w-[280px] snap-start"
            >
              <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40">
                  <Image
                    src={store.heroImage}
                    alt={store.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {store.offerPercent}% OFF
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs">
                    ⭐ 4.5
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border shrink-0">
                      <Image
                        src={store.logo}
                        alt={store.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {store.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {store.area}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>📍 {store.distanceKm} km</span>
                    <span>•</span>
                    <span>{store.categories[0]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="w-4 shrink-0" />
        </div>
      </div> */}
      <div className="px-4 py-6">
        {/* <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Exclusive Offers</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2" style={{ scrollPaddingLeft: '1rem' }}>
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="min-w-[280px] snap-start rounded-xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    LIMITED TIME
                  </div>
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-1">{offer.title}</h3>
                {offer.subtitle && (
                  <p className="text-sm text-muted-foreground mb-3">{offer.subtitle}</p>
                )}
                {offer.cta && (
                  <button className="text-sm font-semibold text-primary hover:underline">
                    {offer.cta} →
                  </button>
                )}
              </div>
            ))}
            <div className="w-4 shrink-0" />
          </div>
        </div> */}

        {/* All Salons List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">All Salons Near You</h2>
          </div>

          {filteredStores.length > 0 ? (
            <div className="space-y-4">
              {filteredStores.map((store) => (
                <Link
                  key={store.slug}
                  href={`/stores/${store.slug}`}
                  className="block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all"
                >
                  {/* Hero Image */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={store.heroImage}
                      alt={store.name}
                      fill
                      className="object-cover"
                    />
                    {/* Pagination dots */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    </div>
                  </div>
                  
                  {/* Offer Badge */}
                  <div className="bg-primary/90 px-4 py-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-sm font-semibold">
                      Flat {store.offerPercent}% OFF
                    </span>
                  </div>

                  {/* Store Info */}
                  <div className="p-4 bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{store.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold inline-flex items-center gap-1">
                            4.4 ★
                          </span>
                          <span>{store.categories[0]}</span>
                          <span>•</span>
                          <span>₹1300 for two</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {store.distanceKm} km • {store.area}, {store.city}
                        </div>
                      </div>
                      
                      {/* Bookmark Icon */}
                      <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-muted-foreground">
                No salons found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
