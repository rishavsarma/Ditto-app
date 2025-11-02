import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/home"
            className="block w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all"
          >
            Go to Home
          </Link>
          <Link
            href="/stores"
            className="block w-full py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-all"
          >
            Browse Stores
          </Link>
        </div>
      </div>
    </div>
  )
}
