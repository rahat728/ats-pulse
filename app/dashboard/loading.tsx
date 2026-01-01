import { Card } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-muted rounded w-48"></div>
        <Card className="p-8">
          <div className="h-24 bg-muted rounded"></div>
        </Card>
        <Card className="p-8">
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-32"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
