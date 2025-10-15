"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavTabsSalon() {
  const pathname = usePathname()
  const tabs = [
    { href: "/", label: "For You" },
    { href: "/stores", label: "Stores" },
  ]
  return (
    <nav className="px-4 md:px-0">
      <ul className="flex items-center gap-6 border-b border-border/40">
        {tabs.map((t) => {
          const active = pathname === t.href
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={`pb-3 inline-block text-sm md:text-base ${
                  active ? "text-foreground border-b-2 border-primary" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
