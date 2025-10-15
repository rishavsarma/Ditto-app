export function OfferCard({
  title,
  sub,
  tone = "primary",
}: {
  title: string
  sub?: string
  tone?: "primary" | "muted"
}) {
  const base = tone === "primary" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
  return (
    <div className={`w-[220px] shrink-0 rounded-xl p-4 border border-border ${base}`}>
      <div className="text-sm font-semibold">{title}</div>
      {sub ? <div className="text-xs opacity-90 mt-1">{sub}</div> : null}
    </div>
  )
}
