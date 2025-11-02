"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

const popularCities = [
  { name: "Delhi NCR", icon: "🏛️" },
  { name: "Mumbai", icon: "🏙️" },
  { name: "Kolkata", icon: "🕌" },
  { name: "Bengaluru", icon: "🏢" },
  { name: "Hyderabad", icon: "⛩️" },
  { name: "Chandigarh", icon: "🦅" },
]

const allCities = [
  "Abohar",
  "Abu Road",
  "Achampet",
  "Acharapakkam",
  "Addanki",
  "Adilabad",
  "Adipur",
  "Agartala",
  "Agra",
  "Ahmedabad",
  "Ahmednagar",
  "Aizawl",
  "Ajmer",
  "Akola",
  "Alappuzha",
  "Aligarh",
  "Allahabad",
  "Alwar",
  "Ambala",
  "Amravati",
  "Amritsar",
  "Anand",
  "Anantapur",
  "Aurangabad",
  "Bangalore",
  "Bareilly",
  "Belgaum",
  "Bellary",
  "Bhopal",
  "Bhubaneswar",
  "Bikaner",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Dehradun",
  "Delhi",
  "Dhanbad",
  "Durgapur",
  "Erode",
  "Faridabad",
  "Gandhinagar",
  "Ghaziabad",
  "Goa",
  "Gorakhpur",
  "Guntur",
  "Gurgaon",
  "Guwahati",
  "Gwalior",
  "Hubli",
  "Hyderabad",
  "Indore",
  "Jabalpur",
  "Jaipur",
  "Jalandhar",
  "Jamnagar",
  "Jamshedpur",
  "Jodhpur",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Kota",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Mangalore",
  "Meerut",
  "Mumbai",
  "Mysore",
  "Nagpur",
  "Nashik",
  "Nellore",
  "Noida",
  "Patna",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Salem",
  "Siliguri",
  "Surat",
  "Thiruvananthapuram",
  "Thrissur",
  "Tiruchirappalli",
  "Tirupati",
  "Udaipur",
  "Vadodara",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
]

export default function LocationPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  async function useCurrentLocation() {
    if (!("geolocation" in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const label = `Near ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`
        localStorage.setItem("currentLocationLabel", label)
        router.back()
      },
      () => {
        localStorage.setItem("currentLocationLabel", "Current location")
        router.back()
      },
    )
  }

  function selectCity(city: string) {
    localStorage.setItem("currentLocationLabel", city)
    router.push("/home")
  }

  const filtered = query.trim()
    ? allCities.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : allCities

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/home" className="text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">Location</h1>
        </div>
      </header>

      <div className="px-4 pb-24">
        {/* Search Bar */}
        <div className="mt-4 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, area or locality"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>

        {/* Use Current Location */}
        <button
          onClick={useCurrentLocation}
          className="mt-4 w-full rounded-xl bg-muted/50 border border-border px-4 py-4 flex items-center justify-between hover:bg-muted transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-medium">Use current location</span>
          </div>
          <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Popular Cities */}
        {!query && (
          <section className="mt-8">
            <h2 className="text-lg font-bold mb-4">Popular cities</h2>
            <div className="grid grid-cols-3 gap-3">
              {popularCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => selectCity(city.name)}
                  className="rounded-xl bg-muted/30 border border-border hover:border-primary/50 hover:bg-muted transition-all p-4 flex flex-col items-center justify-center gap-3 aspect-square group"
                >
                  <div className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">
                    {city.icon}
                  </div>
                  <span className="text-xs font-medium text-center">{city.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* All Cities */}
        <section className="mt-8">
          <h3 className="text-lg font-bold mb-4">All cities</h3>
          <div className="space-y-0 rounded-xl overflow-hidden border border-border bg-card">
            {filtered.length > 0 ? (
              filtered.map((city, index) => (
                <button
                  key={city}
                  onClick={() => selectCity(city)}
                  className={`w-full text-left px-4 py-4 hover:bg-muted/50 transition-colors ${
                    index !== filtered.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-medium">{city}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <p className="text-sm">No cities found matching "{query}"</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
