import React from 'react'
import PromptStudio from '../components/PromptStudio'

export const metadata = {
  title: 'Super-Prompt Studio — FreeAI Engine',
  description: 'Generate high-performance system prompts and creative templates for DeepSeek, Claude, Flux.1, and ChatGPT.',
}

export default function PromptStudioPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          ✍️ FORMULA BUILDER
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          FreeAI <span className="hero-gradient-text">Super-Prompt Studio</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.1rem' }}>
          Extract maximum capability from free models (DeepSeek R1, Flux.1, Claude 3.5) with battle-tested prompt recipes.
        </p>
      </div>

      <PromptStudio />
    </div>
  )
}
