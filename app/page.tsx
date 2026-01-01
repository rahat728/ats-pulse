import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Free ATS Resume Checker
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Check how well your resume matches{" "}
            <span className="text-primary">any job description</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant AI-powered feedback on your resume's ATS compatibility. 
            See exactly what keywords you're missing and how to improve your score.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
              Analyze Your Resume Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>

        {/* How it Works */}
        <div className="pt-16">
          <Card className="p-8 sm:p-10 text-left">
            <h2 className="text-2xl font-semibold mb-6 text-center">How ATS Pulse Works</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold">Paste Your Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Copy and paste your resume text. No file uploads needed.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold">Add Job Description</h3>
                <p className="text-sm text-muted-foreground">
                  Paste the job posting you're applying to.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold">Get Your Score</h3>
                <p className="text-sm text-muted-foreground">
                  See your ATS score, missing keywords, and actionable tips.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-primary">30s</div>
            <div className="text-sm text-muted-foreground">Analysis Time</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-primary">Free</div>
            <div className="text-sm text-muted-foreground">No Credit Card</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Private & Secure</div>
          </div>
        </div>

        {/* Trust Disclaimer */}
        <div className="pt-8">
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            <strong>Note:</strong> ATS (Applicant Tracking Systems) vary by company. 
            ATS Pulse provides general guidance to help optimize your resume, 
            but results may differ across different hiring platforms.
          </p>
        </div>
      </div>
    </div>
  )
}
