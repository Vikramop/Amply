import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
