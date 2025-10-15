import Link from "next/link"
import { notFound } from "next/navigation"
import { stores } from "@/lib/data"

export default function StoreDetail({ params }: { params: { slug: string } }) {
  const s = stores.find((x) => x.slug === params.slug)
  if (!s) return notFound()

  return (
    <main className="mx-auto max-w-md">
      <div className="relative">
        <img src={s.heroImage || "/placeholder.svg"} alt={`${s.name} cover`} className="h-72 w-full object-cover" />
      </div>

      <div className="px-4 pb-28 pt-4">
        <div className="flex items-center gap-3">
          <img src={s.logo || "/placeholder.svg"} alt={`${s.name} logo`} className="h-12 w-12 rounded-lg" />
          <div className="min-w-0">
            <h1 className="text-xl font-semibold">{s.name}</h1>
            <div className="text-sm text-muted-foreground truncate">
              {s.distanceKm} km • {s.area}, {s.city}
            </div>
            <div className="text-sm text-muted-foreground">{s.categories.join(" • ")}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <button className="card-elev py-3 text-sm">Directions</button>
          <button className="card-elev py-3 text-sm">Call Now</button>
          <button className="card-elev py-3 text-sm">Other Stores</button>
        </div>

        <div className="mt-6 flex gap-6 text-sm">
          <span className="font-medium">Offers</span>
          <span className="text-muted-foreground">Service Menu</span>
          <span className="text-muted-foreground">Vibes</span>
          <span className="text-muted-foreground">About</span>
        </div>

        <div className="mt-4 card-elev p-4">
          <div className="text-lg font-semibold">District pay offers</div>
          <p className="text-sm text-muted-foreground">Unlock when you pay via District</p>
          <div className="mt-3 chip w-fit">Pay via District and enjoy additional benefits →</div>
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4">
        <Link href={`/stores/${s.slug}/pay`} className="btn-primary block text-center">
          Pay bill
        </Link>
      </div>
    </main>
  )
}
