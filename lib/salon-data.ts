export type Salon = {
  id: string
  name: string
  area: string
  distanceKm: number
  offer?: string
  logo?: string
  cover?: string
  tags?: string[]
}

export const salons: Salon[] = [
  {
    id: "bblunt",
    name: "BBlunt",
    area: "Ulsoor, Bangalore",
    distanceKm: 2.4,
    offer: "Flat 20% OFF",
    logo: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "ylg",
    name: "YLG Salon",
    area: "Kalyan Nagar, Bangalore",
    distanceKm: 2.4,
    offer: "Flat 25% OFF",
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "enrich",
    name: "Enrich Salons",
    area: "Kammanahalli",
    distanceKm: 2.5,
    offer: "Flat 15% OFF",
    logo: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "bodycraft",
    name: "Bodycraft",
    area: "Ulsoor, Bangalore",
    distanceKm: 2.5,
    offer: "Flat 20% OFF",
    logo: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "lakme",
    name: "Lakmé Salon",
    area: "Indiranagar",
    distanceKm: 3.2,
    offer: "Get 15% OFF",
    logo: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "toni-guy",
    name: "Toni & Guy",
    area: "MG Road",
    distanceKm: 4.1,
    offer: "Get 10% OFF",
    logo: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200&h=200&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
    tags: ["Beauty", "Salon"],
  },
]

// Split into groups of 5 for Festive Checklist horizontal cards
export const festiveGroups = (() => {
  const groups: Salon[][] = []
  for (let i = 0; i < salons.length; i += 5) {
    groups.push(salons.slice(i, i + 5))
  }
  // Ensure at least 2 cards for demo
  if (groups.length === 1) groups.push(salons.slice(0, 5))
  return groups
})()

export const categories = [
  { key: "haircut", label: "Haircut" },
  { key: "color", label: "Hair Color" },
  { key: "spa", label: "Hair Spa" },
  { key: "nails", label: "Nails" },
  { key: "waxing", label: "Waxing" },
  { key: "brows", label: "Brows" },
]
