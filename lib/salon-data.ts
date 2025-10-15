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
    logo: "/salon-logo.png",
    cover: "/images/spotlight-1.jpg",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "ylg",
    name: "YLG Salon",
    area: "Kalyan Nagar, Bangalore",
    distanceKm: 2.4,
    offer: "Flat 25% OFF",
    logo: "/ylg-logo.jpg",
    cover: "/images/trending-1.jpg",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "enrich",
    name: "Enrich Salons",
    area: "Kammanahalli",
    distanceKm: 2.5,
    offer: "Flat 15% OFF",
    logo: "/enrich-logo.jpg",
    cover: "/salon-hair-color.png",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "bodycraft",
    name: "Bodycraft",
    area: "Ulsoor, Bangalore",
    distanceKm: 2.5,
    offer: "Flat 20% OFF",
    logo: "/bodycraft-logo.jpg",
    cover: "/spa-massage.png",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "lakme",
    name: "Lakmé Salon",
    area: "Indiranagar",
    distanceKm: 3.2,
    offer: "Get 15% OFF",
    logo: "/lakme-logo.jpg",
    cover: "/hair-spa.jpg",
    tags: ["Beauty", "Salon"],
  },
  {
    id: "toni-guy",
    name: "Toni & Guy",
    area: "MG Road",
    distanceKm: 4.1,
    offer: "Get 10% OFF",
    logo: "/toni-guy-logo.jpg",
    cover: "/salon-haircut.png",
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
