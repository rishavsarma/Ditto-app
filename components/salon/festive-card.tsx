import type { Salon } from "@/lib/salon-data"
import StoreMiniCard from "./store-mini-card"

export default function FestiveCard({ stores }: { stores: Salon[] }) {
  return (
    <section className="w-80 md:w-96 snap-start rounded-2xl border border-border/40 bg-muted/10 p-3">
      <h4 className="text-sm font-semibold mb-1">Step 1: Get the Glow</h4>
      <p className="text-xs text-foreground/60 mb-2">Find beauty & wellness picks</p>
      <div className="divide-y divide-border/40">
        {stores.slice(0, 5).map((s) => (
          <StoreMiniCard key={s.id} s={s} />
        ))}
      </div>
      <div className="mt-3 text-right">
        <button className="text-xs text-primary">Explore all →</button>
      </div>
    </section>
  )
}
