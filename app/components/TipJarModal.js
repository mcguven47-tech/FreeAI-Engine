'use client'

import React, { useState, useEffect } from 'react'
import { CHECKOUT_CONFIG } from '../../data/checkoutConfig'

export default function TipJarModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState(3)
  const [tipped, setTipped] = useState(false)
  const [donorEmail, setDonorEmail] = useState('')

  useEffect(() => {
    const handleOpenTip = () => {
      setTipped(false)
      setIsOpen(true)
    }

    window.addEventListener('open-tip-modal', handleOpenTip)
    return () => {
      window.removeEventListener('open-tip-modal', handleOpenTip)
    }
  }, [])

  const handleTipAction = (e) => {
    e.preventDefault()

    // If actual BuyMeACoffee link exists, redirect to it
    if (CHECKOUT_CONFIG.coffeeTip.checkoutUrl) {
      window.open(CHECKOUT_CONFIG.coffeeTip.checkoutUrl, '_blank')
      setIsOpen(false)
      return
    }

    setTipped(true)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content tip-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">☕</div>
            <div>
              <h3 className="modal-title">Support FreeAI Engine</h3>
              <p className="modal-subtitle">
                Saved hundreds of dollars on subscriptions? Tip the team a coffee to keep this platform 100% independent.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {tipped ? (
          <div className="modal-success-box">
            <div className="success-check-icon">❤️</div>
            <h4>Thank You For Your Support!</h4>
            <p>
              Your generous contribution helps our automated benchmarking clusters and open-source curation team stay active.
            </p>
            <button className="btn-primary" style={{ marginTop: '1.25rem' }} onClick={() => setIsOpen(false)}>
              Back to Free Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleTipAction} className="modal-form">
            <div className="tip-amounts-grid">
              <button
                type="button"
                className={`tip-btn ${amount === 3 ? 'active' : ''}`}
                onClick={() => setAmount(3)}
              >
                <span className="tip-emoji">☕</span>
                <span className="tip-label">1 Coffee</span>
                <span className="tip-val">$3</span>
              </button>

              <button
                type="button"
                className={`tip-btn ${amount === 5 ? 'active' : ''}`}
                onClick={() => setAmount(5)}
              >
                <span className="tip-emoji">🥐</span>
                <span className="tip-label">Coffee &amp; Snack</span>
                <span className="tip-val">$5</span>
              </button>

              <button
                type="button"
                className={`tip-btn ${amount === 10 ? 'active' : ''}`}
                onClick={() => setAmount(10)}
              >
                <span className="tip-emoji">🍕</span>
                <span className="tip-label">Team Lunch</span>
                <span className="tip-val">$10</span>
              </button>
            </div>

            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Your Email or Nickname (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Fellow AI Enthusiast"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
              />
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn-ghost" onClick={() => setIsOpen(false)}>
                Maybe Later
              </button>
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                ☕ Send ${amount} Tip
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
