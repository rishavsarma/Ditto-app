import Image from "next/image"

type Store = {
  id: string
  name: string
  logo?: string
  area?: string
  distanceKm?: number
  offer?: string
}

export default function FestiveCard({
  title,
  subtitle,
  stores,
}: {
  title: string
  subtitle?: string
  stores: Store[]
}) {
  return (
    <div className="bg-card rounded-2xl p-4 min-w-[320px] max-w-[340px] border border-border">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-foreground text-base font-semibold">{title}</h3>
          {subtitle ? <p className="text-muted-foreground text-xs mt-1">{subtitle}</p> : null}
        </div>
        <span className="text-muted-foreground text-xs">›</span>
      </div>

      <div className="mt-4 grid gap-3">
        {stores.slice(0, 5).map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              {s.logo ? (
                <Image src={s.logo || "/placeholder.svg"} alt={`${s.name} logo`} width={36} height={36} />
              ) : (
                <span className="text-[10px] text-muted-foreground">{s.name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground font-medium truncate">{s.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {s.area || "Nearby"} • {s.distanceKm ? `${s.distanceKm} km` : "—"}
              </p>
              {s.offer ? <p className="text-[11px] text-primary mt-0.5">{s.offer}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
