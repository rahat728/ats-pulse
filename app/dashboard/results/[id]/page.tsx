import { redirect, notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

interface MissingKeywords {
  skills: string[]
  tools: string[]
  softSkills: string[]
}

interface Analysis {
  id: string
  ats_score: number
  missing_keywords: MissingKeywords
  suggestions: string[]
  strengths: string[]
  created_at: string
}

function getScoreColor(score: number): string {
  if (score >= 75) return 'text-green-500'
  if (score >= 50) return 'text-amber-500'
  return 'text-red-500'
}

function getScoreBgColor(score: number): string {
  if (score >= 75) return 'bg-green-500/10 border-green-500/20'
  if (score >= 50) return 'bg-amber-500/10 border-amber-500/20'
  return 'bg-red-500/10 border-red-500/20'
}

function getScoreLabel(score: number): string {
  if (score >= 75) return 'Strong Match'
  if (score >= 50) return 'Moderate Match'
  return 'Needs Improvement'
}

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: analysis, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !analysis) notFound()

  const a = analysis as Analysis

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Analysis Results</h1>
          <p className="text-muted-foreground mt-1">
            {new Date(a.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <Link href="/dashboard/analyze">
          <Button variant="outline">New Analysis</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Score Card */}
        <Card className={`p-6 sm:p-8 border ${getScoreBgColor(a.ats_score)}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-muted-foreground">ATS Score</h2>
              <div className="flex items-baseline gap-3 justify-center sm:justify-start">
                <span className={`text-5xl sm:text-6xl font-bold ${getScoreColor(a.ats_score)}`}>{a.ats_score}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className={`text-sm font-medium ${getScoreColor(a.ats_score)}`}>{getScoreLabel(a.ats_score)}</p>
            </div>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted/20" />
                <circle
                  cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - a.ats_score / 100)}`}
                  className={getScoreColor(a.ats_score)} strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </Card>

        {/* Missing Keywords */}
        {(a.missing_keywords.skills.length > 0 || a.missing_keywords.tools.length > 0 || a.missing_keywords.softSkills.length > 0) && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Missing Keywords</h3>
            <div className="space-y-6">
              {a.missing_keywords.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {a.missing_keywords.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm border border-primary/20">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {a.missing_keywords.tools.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {a.missing_keywords.tools.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-md text-sm border border-blue-500/20">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {a.missing_keywords.softSkills.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {a.missing_keywords.softSkills.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-md text-sm border border-purple-500/20">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Suggestions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">How to Improve</h3>
          <div className="space-y-4">
            {a.suggestions.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths */}
        {a.strengths.length > 0 && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">What You're Doing Well</h3>
            <div className="space-y-3">
              {a.strengths.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-muted-foreground">{s}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Note:</strong> ATS systems vary. This is general guidance.
          </p>
        </Card>
      </div>
    </div>
  )
}
