import Link from "next/link"

export function SpotlightCard({
  href = "#",
  img,
  title,
  subtitle,
  badge,
}: {
  href?: string
  img: string
  title: string
  subtitle?: string
  badge?: string
}) {
  return (
    <Link
      href={href}
      className="w-[280px] shrink-0 rounded-2xl bg-card text-card-foreground overflow-hidden border border-border"
    >
      <div className="relative h-[170px] w-full">
        <img
          src={img || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        {badge ? (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="p-3">
        <div className="text-sm font-medium line-clamp-2">{title}</div>
        {subtitle ? <div className="mt-1 text-xs text-muted-foreground line-clamp-1">{subtitle}</div> : null}
      </div>
    </Link>
  )
}
