"use client";

import { AppHeader } from "@/components/app-header";
import { stores } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function StoresList() {
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

      {/* Filter Tabs */}
      <div className="px-4 pt-4 pb-3">
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
      <div className="mb-6">
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
      </div>
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
            <div className="space-y-3">
              {filteredStores.map((store) => (
                <Link
                  key={store.slug}
                  href={`/stores/${store.slug}`}
                  className="flex gap-3 p-3 rounded-xl border border-border bg-card hover:shadow-md transition-all"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={store.heroImage}
                      alt={store.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1 right-1 bg-primary text-white px-2 py-0.5 rounded text-xs font-bold">
                      {store.offerPercent}%
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-0.5">
                          {store.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-1">
                          {store.area}, {store.city}
                        </p>
                      </div>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border shrink-0 ml-2">
                        <Image
                          src={store.logo}
                          alt={store.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>📍 {store.distanceKm} km</span>
                      <span>•</span>
                      <span>⭐ 4.5 (120)</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {store.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                        >
                          {cat}
                        </span>
                      ))}
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
