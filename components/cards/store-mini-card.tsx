import Link from "next/link"

export function StoreMiniCard({
  href = "/stores",
  img,
  name,
  distance,
  offer,
}: {
  href?: string
  img: string
  name: string
  distance?: string
  offer?: string
}) {
  return (
    <Link href={href} className="w-[180px] shrink-0 rounded-xl overflow-hidden border border-border bg-card">
      <div className="relative h-[110px]">
        <img
          src={img || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        {offer ? (
          <div className="absolute bottom-2 left-2 rounded-md bg-primary/90 px-2 py-0.5 text-[10px] text-primary-foreground">
            {offer}
          </div>
        ) : null}
      </div>
      <div className="p-2">
        <div className="text-sm font-medium line-clamp-1">{name}</div>
        {distance ? <div className="text-xs text-muted-foreground">{distance}</div> : null}
      </div>
    </Link>
  )
}
