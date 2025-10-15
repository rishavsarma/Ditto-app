import { SectionTitle } from "@/components/section-title"
import { SearchBar } from "@/components/search-bar"
import { NavTabs } from "@/components/nav-tabs"
import { stores } from "@/lib/data"
import { StoreCard } from "@/components/store-card"
import { HScroll } from "@/components/h-scroll"
import TopBar from "@/components/top-bar"
import FestiveCard from "@/components/festive/festive-card"

export default function Home() {
  const picks = stores.slice(0, 4)

  const spotlights = [
    {
      id: "sp1",
      title: "Salon Fest • Premium Hair & Spa",
      meta: "This week • Handpicked salons near you",
      img: "/salon-festival-hero.jpg",
    },
    {
      id: "sp2",
      title: "Hair Color Week • Up to 25% OFF",
      meta: "Top color studios • Limited time",
      img: "/hair-color-studio.jpg",
    },
    {
      id: "sp3",
      title: "Spa Retreat • Relax & Rejuvenate",
      meta: "Luxury spa picks • Nearby",
      img: "/spa-retreat-massage.jpg",
    },
  ]

  const introCategories = [
    "Haircut",
    "Hair Color",
    "Hair Spa",
    "Nails",
    "Waxing",
    "Brows",
    "Skincare",
    "Massage",
    "Bridal",
  ]

  const festiveGroups = [
    {
      id: "glow",
      title: "Step 1: Get the Glow",
      subtitle: "Find beauty & wellness picks",
      stores: stores.slice(0, 5).map((s) => ({
        id: s.slug,
        name: s.name,
        logo: s.logo,
        area: `${s.area}, ${s.city}`,
        distanceKm: s.distanceKm,
        offer: `Flat ${s.offerPercent}% off`,
      })),
    },
    {
      id: "fit",
      title: "Step 2: Get Fit",
      subtitle: "Top gyms & fitness",
      stores: stores
        .concat(stores)
        .slice(1, 6)
        .map((s) => ({
          id: `${s.slug}-fit`,
          name: s.name,
          logo: s.logo,
          area: `${s.area}, ${s.city}`,
          distanceKm: s.distanceKm,
          offer: `Save up to ${Math.max(10, s.offerPercent - 5)}%`,
        })),
    },
    {
      id: "style",
      title: "Step 3: Style Upgrade",
      subtitle: "Best salons & spas",
      stores: stores
        .concat(stores)
        .slice(2, 7)
        .map((s) => ({
          id: `${s.slug}-style`,
          name: s.name,
          logo: s.logo,
          area: `${s.area}, ${s.city}`,
          distanceKm: s.distanceKm,
          offer: `Flat ${s.offerPercent}% off`,
        })),
    },
  ]

  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-6">
      <TopBar />
      <SearchBar />
      <NavTabs />

      {/* SALON SPOTLIGHT */}
      <SectionTitle>SALON SPOTLIGHT</SectionTitle>
      <div className="no-scrollbar  mb-2 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
        {spotlights.map((sp) => (
          <a
            key={sp.id}
            href="#"
            className="min-w-[280px] md:min-w-[360px] snap-start overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="relative h-[170px] w-full">
              <img
                src={sp.img || "/placeholder.svg?height=170&width=360&query=salon"}
                alt={sp.title}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
              <span className="absolute left-2 bottom-2 rounded-md bg-[color:var(--brand)] px-2 py-0.5 text-[10px] text-[color:var(--on-brand)]">
                Curated picks for you
              </span>
            </div>
            <div className="p-3">
              <div className="text-sm font-medium line-clamp-2">{sp.title}</div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-1">{sp.meta}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Introducing Salons */}
      <SectionTitle>INTRODUCING SALONS</SectionTitle>
      <div className="card-elev p-4">
        <div className="grid grid-cols-3 gap-3">
          {introCategories.map((c) => (
            <div
              key={c}
              className="aspect-square rounded-full border border-border bg-secondary/30 text-center text-xs text-muted-foreground grid place-items-center"
              aria-label={c}
              title={c}
            >
              {c}
            </div>
          ))}
        </div>
        <button className="btn-primary mt-4 w-full">Explore categories</button>
      </div>

      {/* Trending Looks */}
      <SectionTitle>TRENDING LOOKS</SectionTitle>
      <div className="no-scrollbar mb-2 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
        {stores
          .concat(stores)
          .slice(0, 6)
          .map((s, i) => (
            <div key={`${s.slug}-${i}`} className="min-w-[280px] md:min-w-[340px] snap-start">
              <StoreCard s={s} />
            </div>
          ))}
      </div>

      {/* New Openings */}
      <SectionTitle>NEW OPENINGS</SectionTitle>
      <div className="card-elev overflow-hidden">
        <div className="h-[140px] w-full">
          <img
            src="/new-salon-opening.jpg"
            alt="New salon opening"
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="text-sm font-semibold">Now open: Urban Chic Salon</div>
            <div className="text-xs text-muted-foreground">Indiranagar • Limited launch offers</div>
          </div>
          <button className="btn-primary">View details</button>
        </div>
      </div>

      <SectionTitle>DEALS OF THE WEEK</SectionTitle>
      <div className="no-scrollbar  mb-2 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="w-[260px] md:w-[320px] snap-start overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="relative h-[110px]">
              <img
                src={`/salon-deal-.jpg?key=95wds&height=110&width=320&query=salon%20deal%20${n}`}
                alt={`Salon deal ${n}`}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
              <span className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white">
                Limited time
              </span>
            </div>
            <div className="p-3">
              <div className="text-sm font-medium">Save on premium services</div>
              <div className="text-xs text-muted-foreground">Flat savings on haircuts, color & spa</div>
            </div>
          </div>
        ))}
      </div>

      {/* Festive Checklist */}
      <SectionTitle>FESTIVE CHECKLIST</SectionTitle>
      <HScroll className="mt-2">
        {festiveGroups.map((g) => (
          <FestiveCard key={g.id} title={g.title} subtitle={g.subtitle} stores={g.stores} />
        ))}
      </HScroll>
    </main>
  )
}
