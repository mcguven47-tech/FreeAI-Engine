'use client'

import React, { useState, useMemo } from 'react'

const SUBSCRIPTION_ITEMS = [
  { id: 'midjourney', name: 'Midjourney', price: 30, freeAlt: 'Flux.1 Schnell', icon: '🎨' },
  { id: 'chatgpt', name: 'ChatGPT Plus', price: 20, freeAlt: 'DeepSeek V3 / R1', icon: '✍️' },
  { id: 'cursor', name: 'Cursor AI', price: 20, freeAlt: 'Continue.dev', icon: '💻' },
  { id: 'elevenlabs', name: 'ElevenLabs', price: 22, freeAlt: 'Kokoro-82M', icon: '🎙️' },
  { id: 'runway', name: 'Runway Gen-3', price: 35, freeAlt: 'Luma Dream Machine', icon: '🎬' },
  { id: 'skydive', name: 'Skydive / Zapier', price: 20, freeAlt: 'n8n (Self-Hosted)', icon: '🤖' },
  { id: 'wispr', name: 'Wispr Flow', price: 15, freeAlt: 'Buzz (Whisper.cpp)', icon: '🗣️' },
  { id: 'perplexity', name: 'Perplexity Pro', price: 20, freeAlt: 'Felo AI Search', icon: '🔍' },
]

export default function SavingsCalculator() {
  const [selected, setSelected] = useState(['midjourney', 'chatgpt', 'cursor'])

  const toggleTool = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selected.length === SUBSCRIPTION_ITEMS.length) {
      setSelected([])
    } else {
      setSelected(SUBSCRIPTION_ITEMS.map((item) => item.id))
    }
  }

  const { monthlyTotal, yearlyTotal } = useMemo(() => {
    const monthly = selected.reduce((sum, id) => {
      const item = SUBSCRIPTION_ITEMS.find((t) => t.id === id)
      return sum + (item ? item.price : 0)
    }, 0)
    return {
      monthlyTotal: monthly,
      yearlyTotal: monthly * 12,
    }
  }, [selected])

  return (
    <div className="calc-container">
      <div className="calc-header-badge">
        <span className="live-pulse-dot"></span>
        Interactive Subscription Audit
      </div>

      <h2 className="calc-title">
        How Much Are You <span className="text-burn-gradient">Burning Every Year</span>?
      </h2>
      <p className="calc-subtitle">
        Select the AI subscriptions you or your team currently pay for to see your instant $0 replacement stack.
      </p>

      {/* Selectable Tool Chips */}
      <div className="calc-chips-grid">
        {SUBSCRIPTION_ITEMS.map((item) => {
          const isSelected = selected.includes(item.id)
          return (
            <button
              key={item.id}
              onClick={() => toggleTool(item.id)}
              className={`calc-chip ${isSelected ? 'selected' : ''}`}
            >
              <span className="calc-chip-icon">{item.icon}</span>
              <span className="calc-chip-name">{item.name}</span>
              <span className="calc-chip-price">${item.price}/mo</span>
              <span className="calc-chip-check">{isSelected ? '✓' : '+'}</span>
            </button>
          )
        })}
      </div>

      <div className="calc-select-all-wrap">
        <button onClick={selectAll} className="calc-select-all-btn">
          {selected.length === SUBSCRIPTION_ITEMS.length ? 'Deselect All' : 'Select All 8 Tools'}
        </button>
      </div>

      {/* Tines-Style Node Comparison Board */}
      <div className="calc-bento-results">
        <div className="bento-box bento-waste">
          <span className="bento-label">💸 Current Proprietary Cost</span>
          <div className="bento-value text-red">
            ${monthlyTotal}
            <span className="bento-unit">/month</span>
          </div>
          <div className="bento-annual-waste">
            Costing you <strong style={{ color: '#f87171' }}>${yearlyTotal.toLocaleString()}/year</strong>
          </div>
        </div>

        <div className="bento-node-connector">
          <div className="connector-line"></div>
          <div className="connector-orb">➔</div>
        </div>

        <div className="bento-box bento-free">
          <span className="bento-label">⚡ FreeAI Engine Stack</span>
          <div className="bento-value text-green">
            $0.00
            <span className="bento-unit">/forever</span>
          </div>
          <div className="bento-annual-saved">
            Net Savings: <strong style={{ color: '#34d399' }}>+${yearlyTotal.toLocaleString()}/year</strong>
          </div>
        </div>
      </div>

      {/* Active Replacement Preview */}
      {selected.length > 0 && (
        <div className="active-replacements-preview">
          <div className="replacements-header">
            <span>✨ Your Instant $0 Stack:</span>
          </div>
          <div className="replacements-tags">
            {selected.map((id) => {
              const item = SUBSCRIPTION_ITEMS.find((t) => t.id === id)
              if (!item) return null
              return (
                <div key={id} className="rep-tag">
                  <span className="rep-paid">{item.name}</span>
                  <span className="rep-arrow">➔</span>
                  <span className="rep-free">{item.freeAlt}</span>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <a href="#explorer" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
              Launch Full Free Directory Below ↓
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
