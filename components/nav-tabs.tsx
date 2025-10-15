"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { name: "For You", href: "/" },
  { name: "Stores", href: "/stores" },
]

export function NavTabs() {
  const pathname = usePathname()
  return (
    <nav className="mt-5 grid grid-cols-2 gap-2">
      {tabs.map((t) => {
        const active = t.href === "/" ? pathname === "/" : pathname.startsWith("/stores")
        return (
          <Link
            key={t.name}
            href={t.href}
            className={`rounded-xl py-2 text-center text-sm ${
              active ? "bg-(--surface-elev) text-[color:var(--brand)]" : "text-muted-foreground"
            }`}
          >
            {t.name}
          </Link>
        )
      })}
    </nav>
  )
}
