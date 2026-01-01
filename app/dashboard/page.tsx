import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { signOut } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

interface Analysis {
  id: string
  ats_score: number
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

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: analyses } = await supabase
    .from('analyses')
    .select('id, ats_score, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button variant="outline" type="submit">Sign out</Button>
        </form>
      </div>

      <div className="grid gap-6">
        {/* Quick Start */}
        <Card className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                {analyses?.length ? 'Start Another Analysis' : 'Start Your First Analysis'}
              </h2>
              <p className="text-muted-foreground">
                Compare your resume against a job description
              </p>
            </div>
            <Link href="/dashboard/analyze">
              <Button size="lg">New Analysis</Button>
            </Link>
          </div>
        </Card>

        {/* Recent Analyses */}
        <Card className="p-8">
          <h3 className="text-lg font-semibold mb-6">Recent Analyses</h3>
          
          {!analyses?.length ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-muted-foreground">No analyses yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {analyses.map((analysis: Analysis) => (
                <Link key={analysis.id} href={`/dashboard/results/${analysis.id}`}>
                  <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-lg border ${getScoreBgColor(analysis.ats_score)}`}>
                          <span className={`text-2xl font-bold ${getScoreColor(analysis.ats_score)}`}>
                            {analysis.ats_score}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">ATS Score</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(analysis.created_at).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
