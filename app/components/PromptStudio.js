'use client'

import { useState } from 'react'

export default function PromptStudio() {
  const [modelType, setModelType] = useState('image')
  const [userIdea, setUserIdea] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const quickTemplates = [
    { label: '🖼️ Photorealistic Portrait', type: 'image', idea: 'Cyberpunk street vendor in neon Tokyo night, cinematic lighting, 8k raw photo' },
    { label: '📊 Executive Business Strategy', type: 'chat', idea: 'Analyze a B2B SaaS pricing page and create a conversion rate optimization audit' },
    { label: '💻 Full-Stack Next.js Component', type: 'code', idea: 'Build a responsive dark mode pricing table in React with Framer Motion animations' },
    { label: '🎙️ Voiceover Script', type: 'chat', idea: 'Write an inspiring 60-second commercial script for an innovative solar energy startup' },
  ]

  const handleGenerate = () => {
    if (!userIdea.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      let promptOutput = ''

      if (modelType === 'image') {
        promptOutput = `RAW candid cinematic photograph of ${userIdea.trim()}, captured on 35mm Hasselblad X2D 100C, 85mm f/1.4 lens, natural dramatic chiaroscuro volumetric lighting, hyper-detailed skin pores and realistic textures, ray tracing reflections, cinematic color grading, 8k resolution, photorealistic masterpiece, award-winning photography --ar 16:9 --v 6.1 --style raw --q 2 --s 250`
      } else if (modelType === 'chat') {
        promptOutput = `Act as an elite domain authority, veteran consultant, and principal strategist with 15+ years of real-world executive experience in this sector.

### Mission & Context:
${userIdea.trim()}

### Execution Standards:
1. Discard generic introductory filler or corporate clichés; cut straight to high-leverage insights.
2. Structure your output with clear headers, quantitative benchmark metrics, and prioritized action steps.
3. Highlight subtle failure points, edge-case risks, and exact counter-measures.
4. Provide immediate, copy-and-paste implementation templates where applicable.

Provide your exhaustive analysis below:`
      } else if (modelType === 'code') {
        promptOutput = `You are a Principal Staff Software Architect specializing in TypeScript, Next.js App Router, modern CSS, and clean software architecture.

### Task Specification:
${userIdea.trim()}

### Engineering Requirements:
1. Write production-grade, fully typed, performant, and self-contained code.
2. Implement proper error boundaries, loading states, and edge-case handling.
3. Adhere strictly to modern design tokens, accessibility (ARIA), and clean separation of concerns.
4. Include concise inline documentation explaining architectural decisions.
5. Provide the complete, working code without truncation or placeholders.`
      }

      setGeneratedPrompt(promptOutput)
      setIsLoading(false)
    }, 300)
  }

  const handleCopy = () => {
    if (!generatedPrompt) return
    navigator.clipboard.writeText(generatedPrompt)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <section id="prompt-studio" className="prompt-studio-section">
      <div className="studio-header">
        <div className="studio-badge">⚡ Instant Super-Prompt Generator</div>
        <h2 className="studio-title">Turn Basic Ideas into Million-Dollar Prompts</h2>
        <p className="studio-desc">
          Stop getting mediocre results. Select your target AI model, enter your raw idea, and get a production-ready master prompt formatted for maximum quality.
        </p>
      </div>

      <div className="studio-card">
        {/* Model Selector Tabs */}
        <div className="model-tabs">
          <button
            className={`model-tab ${modelType === 'image' ? 'active' : ''}`}
            onClick={() => setModelType('image')}
          >
            🎨 Flux / Midjourney (Image)
          </button>
          <button
            className={`model-tab ${modelType === 'chat' ? 'active' : ''}`}
            onClick={() => setModelType('chat')}
          >
            ✍️ ChatGPT / Claude (Reasoning)
          </button>
          <button
            className={`model-tab ${modelType === 'code' ? 'active' : ''}`}
            onClick={() => setModelType('code')}
          >
            💻 DeepSeek / Cursor (Code)
          </button>
        </div>

        {/* Quick Inspiration Pills */}
        <div className="quick-templates-row">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick templates:</span>
          {quickTemplates.map((tpl, i) => (
            <button
              key={i}
              className="quick-tpl-btn"
              onClick={() => {
                setModelType(tpl.type)
                setUserIdea(tpl.idea)
              }}
            >
              {tpl.label}
            </button>
          ))}
        </div>

        {/* Idea Input */}
        <div className="input-group">
          <label className="input-label">Your Raw Concept / Subject:</label>
          <div className="input-with-button">
            <textarea
              className="studio-textarea"
              rows={3}
              placeholder="e.g. Modern dark-mode cryptocurrency analytics dashboard with neon gradients and responsive charts..."
              value={userIdea}
              onChange={(e) => setUserIdea(e.target.value)}
            />
            <button
              className="btn-primary studio-generate-btn"
              onClick={handleGenerate}
              disabled={isLoading || !userIdea.trim()}
            >
              {isLoading ? 'Generating...' : '✨ Generate Master Prompt'}
            </button>
          </div>
        </div>

        {/* Result Area */}
        {generatedPrompt && (
          <div className="output-container">
            <div className="output-header">
              <span className="output-label">🎯 Production-Ready Master Prompt:</span>
              <button className="copy-prompt-btn" onClick={handleCopy}>
                {isCopied ? '✓ Copied to Clipboard!' : '📋 Copy Prompt'}
              </button>
            </div>
            <pre className="output-pre">{generatedPrompt}</pre>
          </div>
        )}
      </div>
    </section>
  )
}
