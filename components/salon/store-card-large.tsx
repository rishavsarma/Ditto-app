import type { Salon } from "@/lib/salon-data"

export default function StoreCardLarge({ s }: { s: Salon }) {
  return (
    <article className="min-w-[80%] md:min-w-[360px] snap-start rounded-2xl overflow-hidden bg-muted/20 border border-border/40">
      <div className="relative">
        <img
          src={s.cover || "/placeholder.svg?height=480&width=800&query=salon%20cover"}
          alt=""
          className="h-48 w-full object-cover"
        />
        {s.offer && (
          <div className="absolute left-3 bottom-3 bg-primary text-background text-xs font-medium px-2 py-1 rounded-md">
            {s.offer}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-3">
          <img
            src={s.logo || "/placeholder.svg?height=48&width=48&query=salon%20logo"}
            alt=""
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-base font-semibold">{s.name}</h3>
            <p className="text-xs text-foreground/60">
              {s.area} • {s.distanceKm.toFixed(1)} km
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
