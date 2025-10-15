import type { Salon } from "@/lib/salon-data"

export default function StoreMiniCard({ s }: { s: Salon }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <img
          src={s.logo || "/placeholder.svg?height=48&width=48&query=salon%20logo"}
          alt=""
          className="h-10 w-10 rounded-lg object-cover"
        />
        <div>
          <div className="text-sm font-medium text-foreground">{s.name}</div>
          <div className="text-xs text-foreground/60">
            {s.area} • {s.distanceKm.toFixed(1)} km
          </div>
          {s.offer && <div className="text-[11px] text-primary mt-0.5">{s.offer}</div>}
        </div>
      </div>
    </div>
  )
}
