export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="font-semibold">ATS Pulse</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            AI-powered resume analysis for job seekers
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ATS Pulse
          </p>
        </div>
      </div>
    </footer>
  )
}
