"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { stores } from "@/lib/data"
import { OfferPill } from "@/components/offer-pill"
import { inr } from "@/lib/format"

export default function EnterAmount({ params }: { params: { slug: string } }) {
  const [amount, setAmount] = useState<number>(1500)
  const s = stores.find((x) => x.slug === params.slug)
  if (!s) return notFound()

  const formatted = useMemo(() => inr(amount || 0), [amount])

  return (
    <main className="mx-auto max-w-md px-4 py-6 pb-28">
      <div className="text-sm text-muted-foreground">
        {s.area}, {s.city}
      </div>
      <h1 className="mt-1 text-xl font-semibold">{s.name}</h1>

      <div className="mt-4 card-elev p-4">
        <div className="text-sm text-amber-300/90 bg-amber-950/60 border border-amber-900 rounded-xl px-3 py-2">
          You might be away from this store • Please ensure you’re paying at the correct store
        </div>

        <div className="mt-5">
          <label className="text-sm text-muted-foreground">Enter your bill amount</label>
          <div className="mt-2 rounded-2xl border border-border px-4 py-5 text-3xl font-semibold">{formatted}</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <OfferPill label={`Flat ${s.offerPercent}% OFF on bill payment`} />
          <OfferPill label="10% OFF up to ₹500" />
          <OfferPill label="Bank & wallet offers" />
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4">
        <Link href={`/stores/${s.slug}/checkout?amount=${amount}`} className="btn-primary block text-center">
          Proceed
        </Link>
      </div>
    </main>
  )
}
