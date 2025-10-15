"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const popular = ["Delhi NCR", "Mumbai", "Kolkata", "Bengaluru", "Hyderabad", "Chandigarh"]
const cities = ["Abohar", "Abu Road", "Achampet", "Acharapakkam", "Addanki", "Adilabad", "Adipur"]

export default function LocationPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  async function useCurrentLocation() {
    if (!("geolocation" in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const label = `Near ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`
        localStorage.setItem("currentLocationLabel", label)
        router.back()
      },
      () => {
        localStorage.setItem("currentLocationLabel", "Current location")
        router.back()
      },
    )
  }

  function selectCity(city: string) {
    localStorage.setItem("currentLocationLabel", city)
    router.back()
  }

  const filtered = cities.filter((c) => c.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className="px-4 pb-24">
      <header className="py-3">
        <h1 className="text-lg font-semibold">Location</h1>
      </header>

      <div className="bg-muted/40 rounded-xl p-3 flex items-center gap-2">
        <span className="text-muted-foreground">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city, area or locality"
          className="bg-transparent flex-1 outline-none text-sm"
        />
      </div>

      <button
        onClick={useCurrentLocation}
        className="mt-3 w-full rounded-xl bg-muted/40 px-4 py-3 text-left text-sm flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <span>📍</span>Use current location
        </span>
        <span>›</span>
      </button>

      <section className="mt-6">
        <h2 className="text-base font-semibold">Popular cities</h2>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {popular.map((c) => (
            <button
              key={c}
              onClick={() => selectCity(c)}
              className="rounded-xl bg-card border border-border aspect-square flex items-center justify-center text-sm"
            >
              <span className="text-center">{c}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-base font-semibold">All cities</h3>
        <div className="mt-2 divide-y divide-border rounded-xl overflow-hidden border border-border">
          {filtered.map((c) => (
            <button
              key={c}
              onClick={() => selectCity(c)}
              className="w-full text-left px-4 py-3 bg-card hover:bg-muted/40"
            >
              {c}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
