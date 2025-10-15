"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function TopBar() {
  const [label, setLabel] = useState("Bengaluru")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("currentLocationLabel") : null
    if (saved) setLabel(saved)
  }, [])

  return (
    <div className="flex items-center justify-between py-3">
      <Link href="/location" className="flex items-center gap-2 max-w-[65%]">
        <span aria-hidden className="h-2 w-2 rounded-full bg-primary"></span>
        <span className="text-sm font-medium text-foreground truncate">{label}</span>
      </Link>
      <Link
        href="/profile"
        aria-label="Profile"
        className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium"
      >
        {/* Simple initials placeholder */}
        <span className="text-foreground/80">PR</span>
      </Link>
    </div>
  )
}
