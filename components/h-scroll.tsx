import type React from "react"
import { cn } from "@/lib/utils"

export function HScroll({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]", className)}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="flex gap-3 px-4 pb-2 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">{children}</div>
    </div>
  )
}
