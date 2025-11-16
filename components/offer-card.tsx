import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  subtitle?: string
  cta?: string
}

export function OfferCard({ title, subtitle, cta }: Props) {
  return (
    <Card className="min-w-[260px] shrink-0 border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {subtitle && (
          <CardDescription className="text-sm">{subtitle}</CardDescription>
        )}
      </CardHeader>
      {cta && (
        <CardContent className="p-4 pt-2">
          <Button 
            size="sm" 
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {cta}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
