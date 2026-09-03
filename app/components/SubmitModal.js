'use client'

import React, { useState, useEffect } from 'react'

export default function SubmitModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [tier, setTier] = useState('free')
  const [formData, setFormData] = useState({
    toolName: '',
    toolUrl: '',
    category: 'image',
    expensiveReplaces: '',
    email: '',
  })

  useEffect(() => {
    const handleCustomOpen = () => {
      setSubmitted(false)
      setIsOpen(true)
    }

    window.addEventListener('open-submit-modal', handleCustomOpen)
    return () => {
      window.removeEventListener('open-submit-modal', handleCustomOpen)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">🚀</div>
            <div>
              <h3 className="modal-title">Submit a Free / Open-Source Tool</h3>
              <p className="modal-subtitle">
                Get your tool indexed by FreeAI Engine and discovered by thousands of daily creators.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="modal-success-box">
            <div className="success-check-icon">✓</div>
            <h4>Submission Received!</h4>
            <p>
              Thank you for submitting <strong>{formData.toolName || 'your tool'}</strong>. Our automated benchmarking agent and editorial team will review it within {tier === 'featured' ? '24 hours' : '7 business days'}.
            </p>
            <button className="btn-primary" style={{ marginTop: '1.25rem' }} onClick={() => setIsOpen(false)}>
              Back to Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Tier Selector: Free Queue vs $20 Featured */}
            <div className="tier-selector-row">
              <div
                className={`tier-card ${tier === 'free' ? 'active' : ''}`}
                onClick={() => setTier('free')}
              >
                <div className="tier-badge-pill">Free Tier</div>
                <div className="tier-price">$0</div>
                <div className="tier-desc">Standard queue (reviewed in 1-2 weeks)</div>
              </div>

              <div
                className={`tier-card tier-featured ${tier === 'featured' ? 'active' : ''}`}
                onClick={() => setTier('featured')}
              >
                <div className="tier-badge-pill pill-sparkle">⭐ Featured Launch</div>
                <div className="tier-price">$20 <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>one-time</span></div>
                <div className="tier-desc">Reviewed in 24h + 1-week sticky feature on homepage</div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Tool / Model Name *</label>
                <input
                  required
                  type="text"
                  className="form-input"
                  placeholder="e.g. Kokoro-82M or Continue.dev"
                  value={formData.toolName}
                  onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Website or GitHub Repo URL *</label>
                <input
                  required
                  type="url"
                  className="form-input"
                  placeholder="https://github.com/..."
                  value={formData.toolUrl}
                  onChange={(e) => setFormData({ ...formData, toolUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="image">🎨 Image &amp; Art Generation</option>
                  <option value="chat">✍️ Reasoning &amp; Chat</option>
                  <option value="code">💻 Coding &amp; Developer Tools</option>
                  <option value="audio">🎙️ Voice &amp; Audio Synthesis</option>
                  <option value="video">🎬 Video &amp; Animation</option>
                  <option value="agent">🤖 Autonomous AI Agents &amp; Workflows</option>
                  <option value="search">🔍 Search &amp; Research</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Which Expensive Tool Does It Replace?</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Midjourney, Cursor, or ElevenLabs"
                  value={formData.expensiveReplaces}
                  onChange={(e) => setFormData({ ...formData, expensiveReplaces: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Contact / Maker Email *</label>
                <input
                  required
                  type="email"
                  className="form-input"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn-ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                {tier === 'featured' ? '🚀 Proceed with Featured ($20)' : 'Submit to Free Queue ($0)'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
