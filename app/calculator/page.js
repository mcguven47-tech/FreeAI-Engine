import React from 'react'
import SavingsCalculator from '../components/SavingsCalculator'

export const metadata = {
  title: 'Tasarruf Hesaplayıcı — FreeAI Engine',
  description: 'Mevcut yapay zeka aboneliklerinizi seçin ve ücretsiz alternatiflerle yılda kaç bin dolar tasarruf edebileceğinizi görün.',
}

export default function CalculatorPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          💰 ABONELİK DENETİMİ
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          Yıllık <span className="text-burn-gradient">Yapay Zeka İsrafınızı</span> Hesaplayın
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.1rem' }}>
          Kullandığınız ücretli araçları seçin; 0 TL harcayarak aynı gücü elde edeceğiniz açık kaynak alternatifleri listeyelim.
        </p>
      </div>

      <SavingsCalculator />
    </div>
  )
}
