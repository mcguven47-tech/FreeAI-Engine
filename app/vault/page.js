import React from 'react'
import StarterVault from '../components/StarterVault'

export const metadata = {
  title: 'Ürünlerimiz — The 2026 Free AI Starter Vault & Workflows ($9)',
  description: '500+ Hazır kopyala-yapıştır prompt, sıfır kodla ücretsiz yapay zeka kurulum kılavuzları ve Notion iş akışları.',
}

export default function VaultPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          🎁 DİJİTAL ÜRÜNLERİMİZ
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          FreeAI Engine <span className="hero-gradient-text">Ürün &amp; Şablon Mağazası</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.1rem' }}>
          Aylık yüzlerce dolar ödemeyi bırakın. Öğrenciler, çalışanlar ve içerik üreticileri için hazır promptlar ve iş akışları.
        </p>
      </div>

      <StarterVault />
    </div>
  )
}
