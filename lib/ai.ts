import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeResume(resume: string, jobDescription: string) {
  const prompt = `You are an ATS expert. Analyze this resume against the job description.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Respond with ONLY valid JSON:
{
  "atsScore": <number 0-100>,
  "missingKeywords": {
    "skills": [<missing technical skills>],
    "tools": [<missing tools/technologies>],
    "softSkills": [<missing soft skills>]
  },
  "suggestions": [<3-5 specific improvement tips>],
  "strengths": [<2-3 things done well>]
}`

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  })

  const content = completion.choices[0].message.content
  if (content) return JSON.parse(content)
  throw new Error('No response from AI')
}
