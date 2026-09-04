import React from 'react'
import StarterVault from '../components/StarterVault'

export const metadata = {
  title: 'Starter Vault ($9) — The 2026 Free AI Workflow Vault',
  description: '500+ Battle-tested copy-paste prompts, zero-code free AI setups, and Notion workflows for students & professionals.',
}

export default function VaultPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          🎁 DIGITAL PRODUCT VAULT
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          FreeAI Engine <span className="hero-gradient-text">Product &amp; Template Vault</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.1rem' }}>
          Stop paying $100s in recurring subscriptions. Ready-to-use workflows, prompt libraries, and cheat-sheets for students, creators, and professionals.
        </p>
      </div>

      <StarterVault />
    </div>
  )
}
