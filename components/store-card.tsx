import Link from "next/link"
import type { Store } from "@/lib/data"

export function StoreCard({ s }: { s: Store }) {
  return (
    <Link href={`/stores/${s.slug}`} className="block overflow-hidden rounded-3xl border border-border">
      <div className="relative">
        <img src={s.heroImage || "/placeholder.svg"} alt={`${s.name} cover`} className="h-56 w-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-(--brand) text-(--on-brand) px-4 py-2 text-sm">Flat {s.offerPercent}% OFF</div>
        </div>
      </div>

      <div className="bg-card p-4">
        <div className="flex items-center gap-3">
          <img src={s.logo || "/placeholder.svg"} alt={`${s.name} logo`} className="h-12 w-12 rounded-lg" />
          <div className="min-w-0">
            <div className="font-semibold truncate">{s.name}</div>
            <div className="text-sm text-muted-foreground truncate">
              {s.distanceKm} km • {s.area}, {s.city}
            </div>
            <div className="text-sm text-muted-foreground">{s.categories.join(" • ")}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
