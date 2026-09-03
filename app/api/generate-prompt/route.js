import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { idea, modelType } = await req.json()

    if (!idea || typeof idea !== 'string') {
      return NextResponse.json({ error: 'Valid idea string is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // If Gemini API Key is present in environment, use it dynamically
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are an elite Prompt Engineer. Expand this raw user idea into an exhaustive, production-grade super-prompt for ${modelType}: "${idea}". Include lighting, camera angles, styling, quality tags, and parameters. Output ONLY the raw prompt without conversational filler.`,
                    },
                  ],
                },
              ],
            }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (generatedText) {
            return NextResponse.json({ prompt: generatedText.trim() })
          }
        }
      } catch (apiErr) {
        console.warn('Direct Gemini API call fallback triggered:', apiErr)
      }
    }

    // High-quality structured fallback
    let fallbackPrompt = ''
    if (modelType === 'image') {
      fallbackPrompt = `RAW candid cinematic photograph of ${idea.trim()}, captured on 35mm Hasselblad X2D 100C, 85mm f/1.4 lens, natural dramatic volumetric lighting, hyper-detailed skin pores and realistic textures, ray tracing reflections, cinematic color grading, 8k resolution, photorealistic masterpiece, award-winning photography --ar 16:9 --v 6.1 --style raw --q 2 --s 250`
    } else if (modelType === 'code') {
      fallbackPrompt = `You are a Principal Software Architect. Build a clean, modular, production-ready solution for: "${idea.trim()}". Adhere strictly to TypeScript, modern design tokens, proper error boundaries, and zero placeholders.`
    } else {
      fallbackPrompt = `Act as an elite domain authority and principal executive strategist with 15+ years of experience. Analyze: "${idea.trim()}". Structure your response with quantitative metrics, tactical action steps, and high-leverage frameworks without filler.`
    }

    return NextResponse.json({ prompt: fallbackPrompt })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
