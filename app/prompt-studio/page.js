import React from 'react'
import PromptStudio from '../components/PromptStudio'

export const metadata = {
  title: 'Prompt Studio — FreeAI Engine',
  description: 'DeepSeek, Claude ve ChatGPT için yüksek performanslı promptlar oluşturun.',
}

export default function PromptStudioPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          ✍️ FORMÜL OLUŞTURUCU
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          FreeAI <span className="hero-gradient-text">Prompt Studio</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.1rem' }}>
          Ücretsiz modellerden (DeepSeek, Flux.1, Claude) en üst düzey performansı almak için test edilmiş prompt şablonları.
        </p>
      </div>

      <PromptStudio />
    </div>
  )
}
