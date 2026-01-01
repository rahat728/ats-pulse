# ATS Pulse

AI-powered resume analysis for ATS (Applicant Tracking System) compatibility.

## Features

- 📝 **Resume Analysis** - Paste your resume and job description
- 🎯 **ATS Score** - Get a compatibility score out of 100
- 🔍 **Missing Keywords** - See exactly what skills/tools you're missing
- 💡 **Actionable Tips** - Get specific suggestions to improve
- ✅ **Strengths** - Know what you're doing well
- 📊 **History** - Track all your analyses

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: Anthropic Claude / OpenAI GPT

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
Visit http://localhost:3000

Environment Variables
env

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ANTHROPIC_API_KEY=your-api-key  # or OPENAI_API_KEY
Deployment
Vercel (Recommended)
Push to GitHub
Import to Vercel
Add environment variables
Deploy
Bash

npm run build  # Test build locally first
Project Structure
text

├── app/
│   ├── page.tsx              # Landing page
│   ├── login/                # Auth pages
│   ├── signup/
│   ├── dashboard/
│   │   ├── page.tsx          # Dashboard
│   │   ├── analyze/          # New analysis
│   │   └── results/[id]/     # Results page
│   └── api/
│       └── analyze/          # AI analysis endpoint
├── components/
│   └── ui/                   # shadcn components
├── lib/
│   ├── ai.ts                 # AI client
│   ├── supabase.ts           # Browser client
│   └── supabase-server.ts    # Server client
└── middleware.ts             # Auth middleware
License
MIT
