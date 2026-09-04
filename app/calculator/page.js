import React from 'react'
import SavingsCalculator from '../components/SavingsCalculator'

export const metadata = {
  title: 'Savings Calculator — FreeAI Engine',
  description: 'Audit your recurring AI subscriptions and discover how much you save with verified 100% free alternatives.',
}

export default function CalculatorPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          💰 SUBSCRIPTION AUDIT
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          How Much Are You <span className="text-burn-gradient">Burning Every Year</span>?
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.1rem' }}>
          Select the AI subscriptions you currently pay for to see your instant $0 replacement stack and annual savings.
        </p>
      </div>

      <SavingsCalculator />
    </div>
  )
}
