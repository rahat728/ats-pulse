import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { createClient } from '@/lib/supabase-server'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ATS Pulse | Free Resume ATS Checker",
  description: "Check how well your resume matches any job description. Get instant AI-powered feedback on ATS compatibility, missing keywords, and actionable improvements.",
  keywords: ["ATS", "resume checker", "job application", "resume optimization", "applicant tracking system"],
  openGraph: {
    title: "ATS Pulse | Free Resume ATS Checker",
    description: "Check how well your resume matches any job description. Get instant AI-powered feedback.",
    type: "website",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-background">
          <nav className="border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xl font-semibold">ATS Pulse</span>
                </Link>
                {user ? (
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm">Dashboard</Button>
                    </Link>
                    <Link href="/dashboard/analyze">
                      <Button size="sm">New Analysis</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" size="sm">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
