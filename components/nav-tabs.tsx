"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { name: "For You", href: "/" },
  { name: "Stores", href: "/stores" },
]

export function NavTabs() {
  const pathname = usePathname()
  const activeTab = pathname === "/" ? "/" : "/stores"
  
  return (
    <Tabs value={activeTab} className="mt-5 w-full">
      <TabsList className="grid w-full grid-cols-2 h-11">
        {tabs.map((t) => (
          <Link key={t.name} href={t.href} className="contents">
            <TabsTrigger 
              value={t.href} 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t.name}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  )
}
