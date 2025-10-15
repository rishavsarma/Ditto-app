type Props = {
  title: string
  subtitle?: string
  cta?: string
}

export function OfferCard({ title, subtitle, cta }: Props) {
  return (
    <div
      className="min-w-[260px] shrink-0 rounded-2xl border border-border p-4"
      style={{ background: "var(--surface-elev)" }}
    >
      <div className="text-base font-semibold">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div> : null}
      {cta ? (
        <div
          className="mt-4 inline-block rounded-full px-3 py-1 text-sm"
          style={{ background: "var(--brand)", color: "var(--on-brand)" }}
        >
          {cta}
        </div>
      ) : null}
    </div>
  )
}
