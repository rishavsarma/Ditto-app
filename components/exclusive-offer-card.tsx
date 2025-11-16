interface ExclusiveOfferCardProps {
  discount: number;
}

export function ExclusiveOfferCard({ discount }: ExclusiveOfferCardProps) {
  return (
    <div className="min-w-[320px] snap-start rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent p-4 shadow-lg hover:shadow-xl transition-all">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold mb-3">
        LIMITED TIME
      </div>
      <h3 className="text-xl font-bold mb-2">
        Flat {discount}% OFF
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        On premium salon services
      </p>
      <button className="btn-primary w-full text-sm py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
        Claim Offer
      </button>
    </div>
  );
}
