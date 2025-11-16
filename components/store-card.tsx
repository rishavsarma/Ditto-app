import Link from "next/link"
import Image from "next/image"
import type { Store } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function StoreCard({ s }: { s: Store }) {
  return (
    <Link href={`/stores/${s.slug}`} className="block">
      <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
        <div className="relative h-56 w-full">
          <Image 
            src={s.heroImage || "/placeholder.svg"} 
            alt={`${s.name} cover`} 
            fill
            className="object-cover"
          />
          <Badge 
            className="absolute bottom-0 left-0 right-0 rounded-none bg-primary/90 text-primary-foreground hover:bg-primary/90 py-2 text-sm font-semibold"
          >
            Flat {s.offerPercent}% OFF
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage src={s.logo || "/placeholder.svg"} alt={`${s.name} logo`} />
              <AvatarFallback className="rounded-lg">{s.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold truncate">{s.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {s.distanceKm} km • {s.area}, {s.city}
              </p>
              <p className="text-sm text-muted-foreground">{s.categories.join(" • ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
