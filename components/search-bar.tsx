"use client"

import { useState } from "react"

export function SearchBar() {
  const [q, setQ] = useState("")
  return (
    <div className="card-elev flex items-center gap-3 px-4 py-3">
      <span className="text-muted-foreground">🔎</span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for 'Sneakers'"
        className="w-full bg-transparent outline-none placeholder:text-muted-foreground/70"
        aria-label="Search"
      />
    </div>
  )
}
