import Link from "next/link"
import { notFound } from "next/navigation"
import { stores } from "@/lib/data"
import { computeSavings, inr } from "@/lib/format"

export default function Checkout({
  params,
  searchParams,
}: { params: { slug: string }; searchParams: { amount?: string } }) {
  const s = stores.find((x) => x.slug === params.slug)
  if (!s) return notFound()

  const amount = Math.max(0, Number(searchParams.amount ?? 0))
  const { saving, payable } = computeSavings(amount, s.offerPercent)

  return (
    <main className="mx-auto max-w-md px-4 py-6 pb-40">
      <div className="text-sm text-muted-foreground">
        {s.area}, {s.city}
      </div>
      <h1 className="mt-1 text-xl font-semibold">{s.name}</h1>

      <div className="mt-4 card-elev p-4">
        <div className="text-sm text-amber-300/90 bg-amber-950/60 border border-amber-900 rounded-xl px-3 py-2">
          You might be away from this store
        </div>
      </div>

      <div className="mt-4 card-elev p-4">
        <div className="text-sm text-muted-foreground">Your bill amount</div>
        <div className="mt-2 rounded-xl border border-border p-4">
          <div className="text-sm bg-(--accent-1) text-(--on-brand) rounded-lg px-3 py-2 inline-block">
            You’re saving {inr(saving)} on the bill
          </div>
          <div className="mt-3 text-3xl font-semibold">
            {inr(payable)} <span className="ml-2 line-through text-muted-foreground text-xl">{inr(amount)}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 card-elev p-4">
        <div className="font-medium">Savings corner</div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm">Get 20% off up to ₹1000</div>
            <div className="text-xs text-muted-foreground">with code IDFCDCPRISHOP</div>
          </div>
          <button className="card-elev px-4 py-2">Apply</button>
        </div>
      </div>

      <div className="mt-5 card-elev p-4">
        <div className="text-lg font-semibold">Bill Summary</div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Bill amount</span>
            <span>{inr(amount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Flat {s.offerPercent}% OFF</span>
            <span className="text-[color:var(--brand)]">-{inr(saving)}</span>
          </div>
          <div className="pt-2 border-t border-border flex items-center justify-between font-medium">
            <span>Total</span>
            <span>{inr(payable)}</span>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-md bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-t border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">PAY USING</div>
              <div className="font-medium">Visa •••• 5749</div>
            </div>
            <Link href="#" className="btn-primary">
              Pay now • {inr(payable)}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
