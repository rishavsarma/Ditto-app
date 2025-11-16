"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AppHeaderProps {
  variant?: "main" | "back" | "back-with-location";
  title?: string;
  showSearch?: boolean;
}

export function AppHeader({
  variant = "main",
  title,
  showSearch = false,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [location, setLocation] = useState("Narikal Bari");
  const [locationSubtext, setLocationSubtext] = useState("Guwahati");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("currentLocationLabel");
    if (savedLocation) {
      setLocation(savedLocation);
      setLocationSubtext("");
    }
  }, []);

  console.log('variant', variant)

  // Determine if we're on a main page
  const isMainPage =
    pathname === "/home" || pathname === "/stores" || pathname === "/";

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Location or Back button */}
        {variant === "main" ? (
          <Link href="/location" className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 00-6 6c0 4.314 6 10 6 10s6-5.686 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
            <div>
              {locationSubtext && (
                <div className="text-xs text-muted-foreground">
                  {locationSubtext}
                </div>
              )}
              <div className="text-sm font-semibold">{location}</div>
            </div>
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
        ) : variant === "back-with-location" ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-lg transition-colors -ml-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <Link href="/location" className="flex items-end gap-2">
              <div>
                {locationSubtext && (
                  <div className="text-xs text-muted-foreground">
                    {locationSubtext}
                  </div>
                )}
                <div className="text-sm font-semibold">{location}</div>
              </div>
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-lg transition-colors -ml-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {title && (
              <div>
                <h1 className="text-lg font-bold">{title}</h1>
              </div>
            )}
          </div>
        )}

        {/* Right side - Profile */}
        <Link href="/profile">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
            <Image src="/ditto-logo.svg" alt="Profile" width={24} height={24} />
          </div>
        </Link>
      </div>

      {/* Search Bar - Only if showSearch is true */}
      {showSearch && (
        <div className="px-4 pb-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for salons, spa, beauty services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}
