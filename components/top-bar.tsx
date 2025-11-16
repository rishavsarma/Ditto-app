"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin } from "lucide-react"

export default function TopBar() {
  const [label, setLabel] = useState("Bengaluru")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("currentLocationLabel") : null
    if (saved) setLabel(saved)
  }, [])

  return (
    <div className="flex items-center justify-between py-3">
      <Link href="/location" className="flex items-center gap-2 max-w-[65%] hover:opacity-80 transition-opacity">
        <MapPin className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground truncate">{label}</span>
      </Link>
      <Link href="/profile" aria-label="Profile">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs bg-muted">PR</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  )
}
