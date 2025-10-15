export type Store = {
  slug: string
  name: string
  distanceKm: number
  area: string
  city: string
  categories: string[]
  offerPercent: number
  heroImage: string
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
    heroImage: "/images/store-hero.jpg",
    logo: "/bblunt.jpg",
  },
  {
    slug: "ylg-salon",
    name: "YLG Salon",
    distanceKm: 2.4,
    area: "Kalyan Nagar",
    city: "Bangalore",
    categories: ["Beauty", "Salon"],
    offerPercent: 25,
    heroImage: "/images/hero-salon-1.jpg",
    logo: "/ylg.jpg",
  },
  {
    slug: "enrich",
    name: "Enrich Salons",
    distanceKm: 2.5,
    area: "Kammanahalli",
    city: "Bangalore",
    categories: ["Beauty", "Salon"],
    offerPercent: 15,
    heroImage: "/images/hero-salon-1.jpg",
    logo: "/enrich.jpg",
  },
  {
    slug: "bodycraft",
    name: "Bodycraft",
    distanceKm: 2.5,
    area: "Ulsoor",
    city: "Bangalore",
    categories: ["Beauty", "Salon"],
    offerPercent: 20,
    heroImage: "/images/hero-salon-1.jpg",
    logo: "/bodycraft.jpg",
  },
]

export type Offer = { id: string; title: string; subtitle?: string; cta?: string }

export const offers: Offer[] = [
  { id: "offer-1", title: "10% OFF up to ₹500", subtitle: "on your first in‑store transaction", cta: "Know more" },
  { id: "offer-2", title: "Flat 20% OFF", subtitle: "at select salons", cta: "View details" },
  { id: "offer-3", title: "Get 20% off up to ₹1000", subtitle: "with bank offers", cta: "Apply" },
]
