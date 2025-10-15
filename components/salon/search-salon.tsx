"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchSalon({ placeholder = "Search for 'Hair spa'" }) {
  const [q, setQ] = useState("")
  const router = useRouter()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        router.push(`/stores?query=${encodeURIComponent(q)}`)
      }}
      className="px-4 md:px-0 py-2"
    >
      <label className="block">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-muted/30 text-foreground placeholder:text-foreground/40 px-4 py-3 outline-none"
          aria-label="Search salons"
        />
      </label>
    </form>
  )
}
