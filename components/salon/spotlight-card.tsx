export default function SpotlightCard({
  title,
  sub,
  img,
  cta = "Book now",
}: {
  title: string
  sub?: string
  img: string
  cta?: string
}) {
  return (
    <article className="min-w-[80%] md:min-w-[420px] snap-start rounded-2xl overflow-hidden bg-muted/20 border border-border/40">
      <div className="relative">
        <img src={img || "/placeholder.svg"} alt="" className="h-48 w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/70 to-transparent">
          <h3 className="text-lg font-semibold">{title}</h3>
          {sub && <p className="text-sm text-foreground/70">{sub}</p>}
          <button className="mt-2 text-sm px-3 py-1.5 rounded-md bg-primary text-background">{cta}</button>
        </div>
      </div>
    </article>
  )
}
