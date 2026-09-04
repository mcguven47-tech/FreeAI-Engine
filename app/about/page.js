import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'About Us — FreeAI Engine',
  description: 'Why FreeAI Engine was built: The open-source AI revolution and our independent mission.',
}

export default function AboutPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          📖 OUR MISSION
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          AI Should Be <span className="hero-gradient-text">Free &amp; Open For Everyone</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
          We are an independent initiative testing, benchmarking, and indexing 100% free, freemium, and open-source alternatives to expensive proprietary AI monopolies.
        </p>
      </div>

      <div className="about-content-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', padding: '3rem 2.5rem', backdropFilter: 'blur(20px)', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>
          🚀 Why We Built FreeAI Engine
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Proprietary AI companies charge $20 to $50 every month for ChatGPT Plus, Midjourney, Cursor, and ElevenLabs. For students, creators, freelancers, and small businesses, these recurring subscriptions add up to thousands of dollars every year.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
          Meanwhile, the global open-source community has built breakthrough models like Flux.1, DeepSeek, Kokoro, and Continue.dev that match or exceed closed APIs at $0 cost. Our mission is to curate, benchmark, and put these tools into everyone&apos;s hands.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.4rem' }}>100% Independent</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>No secret VC pressure or closed agendas. Built for the community.</p>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.4rem' }}>Privacy &amp; Local First</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>We highlight offline, zero-tracking, and private open weights.</p>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☕</div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.4rem' }}>Community Supported</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Funded directly by user coffee tips and digital workflow templates.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px', padding: '3rem 2rem' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
          Support Independent AI Curation
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          If FreeAI Engine saved you money or helped your daily workflow, consider tipping the team a coffee!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://buymeacoffee.com/freeaiengine" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            ☕ Tip a Coffee ($3)
          </a>
          <Link href="/vault" className="btn-ghost" style={{ padding: '0.85rem 2rem' }}>
            🎁 Get $9 Starter Vault
          </Link>
        </div>
      </div>
    </div>
  )
}
