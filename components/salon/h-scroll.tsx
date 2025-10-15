"use client"
import type * as React from "react"

export function HScroll({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel?: string
}) {
  return (
    <div
      aria-label={ariaLabel}
      className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
    >
      <div className="flex gap-4 px-4 pb-2 md:px-0">{children}</div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
