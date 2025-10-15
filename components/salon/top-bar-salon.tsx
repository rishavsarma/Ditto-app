"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function TopBarSalon() {
  const router = useRouter()
  const [location, setLocation] = useState("Bengaluru")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("v0.location") : null
    if (saved) setLocation(saved)
  }, [])

  return (
    <header className="flex items-center justify-between px-4 md:px-0 py-3">
      <button
        onClick={() => router.push("/location")}
        className="text-sm md:text-base font-medium text-foreground/90 hover:text-foreground transition-colors"
        aria-label="Change location"
      >
        {location}
      </button>
      <button
        onClick={() => router.push("/profile")}
        className="h-8 w-8 rounded-full bg-muted/40 flex items-center justify-center text-xs"
        aria-label="Profile"
      >
        {/* simple avatar placeholder */}
        <span className="sr-only">Profile</span>
        <span className="font-semibold text-foreground/70">P</span>
      </button>
    </header>
  )
}
