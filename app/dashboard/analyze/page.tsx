'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

type AnalysisStep = 'extracting' | 'matching' | 'evaluating' | 'calculating'

const steps: { step: AnalysisStep; label: string }[] = [
  { step: 'extracting', label: 'Extracting role keywords' },
  { step: 'matching', label: 'Matching skills' },
  { step: 'evaluating', label: 'Evaluating resume structure' },
  { step: 'calculating', label: 'Calculating ATS score' },
]

export default function AnalyzePage() {
  const router = useRouter()
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState<AnalysisStep | null>(null)
  const [error, setError] = useState<string | null>(null)

  const resumeLength = resume.trim().length
  const jobDescLength = jobDescription.trim().length
  const isValid = resumeLength >= 100 && jobDescLength >= 50
  const currentStepIndex = currentStep ? steps.findIndex(s => s.step === currentStep) : -1

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)
    
    for (const { step } of steps) {
      setCurrentStep(step)
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: resume.trim(),
          jobDescription: jobDescription.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }
      
      router.push(`/dashboard/results/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsAnalyzing(false)
      setCurrentStep(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">New Analysis</h1>
        <p className="text-muted-foreground mt-1">Compare your resume against a job description</p>
      </div>

      {/* Progress Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="p-8 max-w-md w-full">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Analyzing Resume</h2>
                <p className="text-muted-foreground text-sm">This usually takes 20-30 seconds</p>
              </div>
              <div className="space-y-4">
                {steps.map(({ step, label }, index) => (
                  <div
                    key={step}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      currentStep === step ? 'bg-primary/10 border border-primary/20'
                        : index < currentStepIndex ? 'bg-muted' : ''
                    }`}
                  >
                    {currentStep === step ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : index < currentStepIndex ? (
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className={currentStep === step ? 'font-medium' : 'text-muted-foreground'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="resume" className="text-base font-semibold">Your Resume</Label>
              <span className={`text-sm ${resumeLength >= 100 ? 'text-primary' : 'text-muted-foreground'}`}>
                {resumeLength.toLocaleString()} chars
              </span>
            </div>
            <Textarea
              id="resume"
              placeholder="Paste your resume here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              disabled={isAnalyzing}
              className="min-h-[400px] resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {resumeLength < 100 ? `Need ${100 - resumeLength} more chars` : '✓ Ready'}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="jd" className="text-base font-semibold">Job Description</Label>
              <span className={`text-sm ${jobDescLength >= 50 ? 'text-primary' : 'text-muted-foreground'}`}>
                {jobDescLength.toLocaleString()} chars
              </span>
            </div>
            <Textarea
              id="jd"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isAnalyzing}
              className="min-h-[400px] resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {jobDescLength < 50 ? `Need ${50 - jobDescLength} more chars` : '✓ Ready'}
            </p>
          </div>
        </Card>
      </div>

      {error && (
        <Card className="p-4 mb-6 border-red-500/20 bg-red-500/10">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-500">{error}</p>
              <p className="text-xs text-red-500/80 mt-1">Please try again.</p>
            </div>
          </div>
        </Card>
      )}

      <div className="sticky bottom-6 z-10">
        <Card className="p-4 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              {!isValid ? 'Complete both fields' : 'Ready • ~30 seconds'}
            </span>
            <Button onClick={handleAnalyze} disabled={!isValid || isAnalyzing} size="lg" className="min-w-[200px]">
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
