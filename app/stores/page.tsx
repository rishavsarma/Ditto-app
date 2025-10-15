import { stores, offers } from "@/lib/data"
import { StoreCard } from "@/components/store-card"
import { OfferCard } from "@/components/offer-card"
import { SearchBar } from "@/components/search-bar" // add search bar at top
import { NavTabs } from "@/components/nav-tabs" // show tabs here too
import TopBar from "@/components/top-bar" // show location/profile

export default function StoresList() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-6">
      <TopBar />
      <SearchBar />
      <NavTabs />

      {/* Decorative divider */}
      <div className="my-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <div className="tracking-[0.3em] text-sm text-muted-foreground">ALL STORES</div>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Featured stores - horizontal scroll */}
      <section className="mb-6">
        {/* Horizontal featured cards */}
        <div className="mb-3 text-sm text-muted-foreground">Featured near you</div>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
          {stores.concat(stores).map((s, i) => (
            <div key={`${s.slug}-${i}`} className="min-w-[280px] md:min-w-[340px] snap-start">
              <StoreCard s={s} />
            </div>
          ))}
        </div>
      </section>

      {/* Offers - horizontal scroll */}
      <section className="mb-8">
        {/* Horizontally scrollable offers carousel */}
        <div className="mb-3 text-sm text-muted-foreground">Offers for you</div>
        <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-1">
          {offers.map((o) => (
            <div key={o.id} className="snap-start">
              <OfferCard title={o.title} subtitle={o.subtitle} cta={o.cta} />
            </div>
          ))}
        </div>
      </section>

      {/* Store list below offers (vertical) */}
      <div className="space-y-6">
        {stores.map((s) => (
          <StoreCard key={s.slug} s={s} />
        ))}
      </div>
    </main>
  )
}
