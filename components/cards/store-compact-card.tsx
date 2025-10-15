import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  id: string
  name: string
  logo?: string
  distance?: string
  locality?: string
  offer?: string
  className?: string
}

export function StoreCompactCard({
  id,
  name,
  logo = "/store-logo.jpg",
  distance,
  locality,
  offer,
  className,
}: Props) {
  return (
    <article
      key={id}
      className={cn(
        "min-w-[18rem] snap-start rounded-2xl border border-border bg-card p-4",
        "flex items-start gap-3",
        className,
      )}
    >
      <div className="h-12 w-12 overflow-hidden rounded-xl bg-muted ring-1 ring-border flex items-center justify-center">
        <Image src={logo || "/placeholder.svg"} alt={`${name} logo`} width={48} height={48} className="object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-medium leading-tight text-foreground text-pretty">{name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {locality ? `${locality}` : ""}
          {distance ? ` • ${distance}` : ""}
        </p>
        {offer ? (
          <div className="mt-2 inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary">
            {offer}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default StoreCompactCard
