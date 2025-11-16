"use client";

import { AppHeader } from "@/components/app-header";
import { stores } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExclusiveOfferCard } from "@/components/exclusive-offer-card";
import { StoreImageCarousel } from "@/components/store-image-carousel";

export default function StoresList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Nearest", "Top Rated", "Most Popular", "Premium", "Trending", "New", "Best Offers"];

  const filteredStores = searchQuery
    ? stores.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.area.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stores;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pb-20 overflow-x-hidden">
      {/* Header */}
      <AppHeader variant="back-with-location" title="All Salons" showSearch={true} />

      {/* Filter Tabs */}
      <div className="py-4 bg-background">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4" style={{ scrollPaddingLeft: "1rem" }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all snap-start shrink-0 ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
          <div className="w-4 shrink-0" />
        </div>
      </div>
      
      {/* Exclusive Offers Banner */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-4 mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Exclusive Offers</h2>
            <p className="text-xs text-muted-foreground mt-1">Limited time deals</p>
          </div>
        </div>

        <div
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2"
          style={{ scrollPaddingLeft: "1rem" }}
        >
          {[1, 2, 3, 4].map((n) => (
            <ExclusiveOfferCard key={n} discount={20 + n * 5} />
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
      <div className="px-4 pb-6">
        {/* All Salons List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">All Salons Near You</h2>
              <p className="text-xs text-muted-foreground mt-1">{filteredStores.length} salons available</p>
            </div>
          </div>

          {filteredStores.length > 0 ? (
            <div className="space-y-4">
              {filteredStores.map((store, idx) => (
                <Link
                  key={store.slug}
                  href={`/stores/${store.slug}`}
                  className="block rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl hover:border-primary/20 transition-all shadow-md group"
                >
                  {/* Hero Image Carousel */}
                  <StoreImageCarousel images={store.images} alt={store.name} />
                  
                  {/* Offer Badge */}
                  <div className="bg-gradient-to-r from-primary via-primary to-primary/90 px-4 py-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-sm font-bold">
                      Flat {store.offerPercent}% OFF
                    </span>
                    <span className="text-white/80 text-xs ml-auto">Limited time</span>
                  </div>

                  {/* Store Info */}
                  <div className="p-4 bg-card">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base mb-2">{store.name}</h3>
                        <div className="flex items-center gap-2 text-xs mb-2 flex-wrap">
                          <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1 shadow-md">
                            <span>⭐</span>
                            <span>{idx % 2 === 0 ? '4.4' : '4.2'}</span>
                          </span>
                          <span className="text-muted-foreground">{store.categories[0]}</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span className="text-muted-foreground">₹1300 for two</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{store.distanceKm} km away • {store.area}, {store.city}</span>
                        </div>
                      </div>
                      
                      {/* Bookmark Icon */}
                      <button className="p-2 rounded-xl border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm hover:shadow-md shrink-0">
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
