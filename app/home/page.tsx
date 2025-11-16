"use client";

import Link from "next/link";
import Image from "next/image";
import { stores } from "@/lib/data";
import { AppHeader } from "@/components/app-header";
import { ExclusiveOfferCard } from "@/components/exclusive-offer-card";

export default function Home() {
  const spotlights = [
    {
      id: "sp1",
      title: "Premium Salon Week • Up to 30% OFF",
      meta: "This week only",
      location: "Salons near you",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop",
      type: "offer",
    },
    {
      id: "sp2",
      title: "Bridal Makeup Special • Book Now",
      meta: "Wedding season offers",
      location: "Top beauty studios",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop",
      type: "offer",
    },
    {
      id: "sp3",
      title: "Luxury Spa Experience • Relax & Rejuvenate",
      meta: "Weekend special",
      location: "Premium spas",
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1000&fit=crop",
      type: "offer",
    },
  ];

  const categories = [
    { 
      name: "Premium salons", 
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop",
      link: "/stores" 
    },
    { 
      name: "Bridal makeup", 
      img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop",
      link: "/stores" 
    },
    { 
      name: "Luxury spas", 
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop",
      link: "/stores" 
    },
    { 
      name: "Hair coloring", 
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop",
      link: "/stores" 
    },
    { 
      name: "Massage therapy", 
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
      link: "/stores" 
    },
    { 
      name: "Nail art", 
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
      link: "/stores" 
    },
  ];

  const festiveGroups = [
    {
      id: "glow",
      title: "Premium Salons Near You",
      subtitle: "Handpicked beauty & wellness",
      stores: stores.slice(0, 4),
    },
    {
      id: "fit",
      title: "Top Rated This Week",
      subtitle: "Highly recommended",
      stores: stores.slice(0, 4),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pb-20">
      {/* Header */}
      <AppHeader variant="main" showSearch={true} />

      {/* Main Content */}
      <div className="px-0 py-8">
        {/* Exclusive Offers */}
        <div className="mb-10">
          <div className="flex items-center justify-between px-4 mb-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Exclusive Offers</h2>
              <p className="text-xs text-muted-foreground mt-1">Limited time deals</p>
            </div>
          </div>

          <div
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2"
            style={{ scrollPaddingLeft: "1rem" }}
          >
            {[1, 2, 3].map((n) => (
              <ExclusiveOfferCard key={n} discount={20 + n * 5} />
            ))}
            <div className="w-4 shrink-0" />
          </div>
        </div>
        {/* Spotlight Section */}
        {/* <div className="mb-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-bold tracking-tight">
              IN THE SPOTLIGHT
            </h2>
          </div>

          <div
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2"
            style={{ scrollPaddingLeft: "1rem" }}
          >
            {spotlights.map((item) => (
              <Link
                key={item.id}
                href="/stores"
                className="min-w-[85vw] max-w-[400px] snap-center"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                      />
                    </svg>
                  </button>

         
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-white">
                      <div className="text-xs mb-2 opacity-90">{item.meta}</div>
                      <h3 className="text-xl font-bold mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="text-sm opacity-80">{item.location}</div>
                    </div>

              
                    <button className="absolute bottom-5 right-5 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-1.5">
                    {spotlights.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === spotlights.indexOf(item)
                            ? "w-6 bg-white"
                            : "w-1.5 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            <div className="w-4 shrink-0" />
          </div>
        </div> */}

        {/* Quick Categories */}
        <div className="mb-10">
          <div className="flex items-center justify-between px-4 mb-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight">What's on your mind?</h2>
              <p className="text-xs text-muted-foreground mt-1">Explore services</p>
            </div>
          </div>
          <div 
            className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2"
            style={{ scrollPaddingLeft: "1rem" }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.link}
                className="relative min-w-[160px] aspect-[4/3] rounded-2xl overflow-hidden group snap-start shadow-md hover:shadow-xl transition-all"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm drop-shadow-lg">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
            <div className="w-4 shrink-0" />
          </div>
        </div>

        {/* Premium Salons */}
        <div className="mb-10">
          <div className="flex items-center justify-between px-4 mb-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Premium Salons Near You</h2>
              <p className="text-xs text-muted-foreground mt-1">Handpicked for you</p>
            </div>
            <Link href="/stores" className="text-sm text-primary font-semibold hover:underline">
              View all →
            </Link>
          </div>

          <div
            className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-4 pb-2"
            style={{ scrollPaddingLeft: "1rem" }}
          >
            {stores.map((store, idx) => (
              <Link
                key={store.slug}
                href={`/stores/${store.slug}`}
                className="min-w-[240px] snap-start group"
              >
                <div className="rounded-2xl overflow-hidden bg-card hover:shadow-2xl transition-all border border-border/50 shadow-md">
                  <div className="relative h-32">
                    <Image
                      src={store.heroImage}
                      alt={store.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                      <span>⭐</span>
                      <span>{idx % 3 === 0 ? '4.0' : idx % 3 === 1 ? '4.5' : '4.1'}</span>
                    </div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-sm mb-1.5 truncate">
                      {store.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2.5 truncate">
                      {store.area}, {store.city}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20">
                        <span className="text-primary text-xs font-bold">
                          {store.offerPercent}% Off
                        </span>
                      </div>
                      {/* {idx % 2 === 0 && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                          <span className="text-orange-600 text-xs font-bold">
                            +25% Off
                          </span>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="w-4 shrink-0" />
          </div>
        </div>

        {/* Top Picks */}
        <div className="mb-8 px-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Top Picks for You</h2>
              <p className="text-xs text-muted-foreground mt-1">Based on your preferences</p>
            </div>
            <Link href="/stores" className="text-sm text-primary font-semibold hover:underline">
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {stores.slice(0, 3).map((store, idx) => (
              <Link
                key={store.slug}
                href={`/stores/${store.slug}`}
                className="flex gap-0 rounded-2xl bg-card hover:shadow-xl transition-all shadow-md group overflow-hidden border border-border/50"
              >
                <div className="relative w-28 shrink-0">
                  <Image
                    src={store.heroImage}
                    alt={store.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="flex-1 min-w-0 p-3">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="font-bold text-sm flex-1">{store.name}</h3>
                    <div className="bg-green-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold ml-2 shadow-md flex items-center gap-1">
                      <span>⭐</span>
                      <span>{idx === 0 ? '4.1' : '4.0'}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {store.area}, {store.city}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="text-primary text-xs font-bold">
                        {idx === 0 ? '15% Off' : '10% Off'}
                      </span>
                    </div>
                    {/* <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <span className="text-orange-600 text-xs font-bold">
                        +25% Off
                      </span>
                    </div> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
