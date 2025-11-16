export type Store = {
  slug: string
  name: string
  distanceKm: number
  area: string
  city: string
  categories: string[]
  offerPercent: number
  heroImage: string
  images: string[]
  logo: string
}

export const stores: Store[] = [
  {
    slug: "bblunt",
    name: "BBlunt",
    distanceKm: 2.4,
    area: "Ulsoor",
    city: "Bangalore",
    categories: ["Beauty", "Salon"],
    offerPercent: 20,
    heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    ],
    logo: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&q=80",
  },
  {
    slug: "ylg-salon",
    name: "YLG Salon",
    distanceKm: 2.4,
    area: "Kalyan Nagar",
    city: "Bangalore",
    categories: ["Beauty", "Salon"],
    offerPercent: 25,
    heroImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80",
    ],
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop&q=80",
  },
  {
    slug: "enrich",
    name: "Enrich Salons",
    distanceKm: 2.5,
    area: "Kammanahalli",
    city: "Bangalore",
    categories: ["Beauty", "Salon"],
    offerPercent: 15,
    heroImage: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    ],
    logo: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop&q=80",
  },
  {
    slug: "bodycraft",
    name: "Bodycraft",
    distanceKm: 2.5,
    area: "Ulsoor",
    city: "Bangalore",
    categories: ["Beauty", "Salon"],
    offerPercent: 20,
    heroImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    ],
    logo: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop&q=80",
  },
]

export type Offer = { id: string; title: string; subtitle?: string; cta?: string }

export const offers: Offer[] = [
  { id: "offer-1", title: "10% OFF up to ₹500", subtitle: "on your first in‑store transaction", cta: "Know more" },
  { id: "offer-2", title: "Flat 20% OFF", subtitle: "at select salons", cta: "View details" },
  { id: "offer-3", title: "Get 20% off up to ₹1000", subtitle: "with bank offers", cta: "Apply" },
]
