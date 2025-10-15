import type React from "react"

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-sm tracking-[0.2em] text-muted-foreground">{children}</h2>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  )
}
