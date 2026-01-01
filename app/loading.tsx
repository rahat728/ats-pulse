export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-muted-foreground">Loading...</span>
      </div>
    </div>
  )
}
