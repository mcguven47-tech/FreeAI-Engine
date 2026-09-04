'use client'

import React, { useState } from 'react'
import { CHECKOUT_CONFIG } from '../../data/checkoutConfig'

export default function StarterVault() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buyerEmail, setBuyerEmail] = useState('')
  const [purchased, setPurchased] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('usd')

  const handleOpenCheckout = () => {
    setIsModalOpen(true)
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()
    const targetUrl =
      selectedCurrency === 'try'
        ? CHECKOUT_CONFIG.starterVault.shopierUrl || CHECKOUT_CONFIG.starterVault.checkoutUrl
        : CHECKOUT_CONFIG.starterVault.checkoutUrl

    if (targetUrl) {
      window.open(targetUrl, '_blank')
    }
    setPurchased(true)
  }

  return (
    <section id="starter-vault" className="vault-section">
      <div className="vault-container">
        {/* Glow Effects */}
        <div className="vault-glow-orb"></div>

        {/* Top Badge */}
        <div className="vault-badge-row">
          <span className="vault-badge">
            🎁 Consumer Edition • Instant Download
          </span>
          <span className="vault-stars">★★★★★ 4.9/5 (1,420+ downloads)</span>
        </div>

        {/* Headline */}
        <h2 className="vault-title">
          The 2026 Free AI Starter Vault &amp; Workflows
        </h2>
        <p className="vault-subtitle">
          Don&apos;t waste 50+ hours trying to prompt or configure open tools. Get the exact copy-paste prompts,
          pre-built templates, and zero-code workflows to replace $100s in monthly subscriptions today.
        </p>

        {/* Feature Grid */}
        <div className="vault-grid">
          {/* Card 1: Students */}
          <div className="vault-card">
            <div className="v-card-icon">🎓</div>
            <h3 className="v-card-title">Student &amp; Research Pack</h3>
            <p className="v-card-desc">
              Turn DeepSeek &amp; Felo into a free personal tutor. 150+ academic prompts for thesis outlines,
              PDF deep analysis, LaTeX formatting, and research citations.
            </p>
            <ul className="v-card-list">
              <li>✓ 1-Click 50-page PDF Summarizer Prompt</li>
              <li>✓ DeepSeek R1 Math &amp; Logic Solver Guides</li>
              <li>✓ Free Plagiarism-Safe Paraphraser Workflows</li>
            </ul>
          </div>

          {/* Card 2: Office & Business */}
          <div className="vault-card highlight-card">
            <div className="popular-ribbon">Most Popular</div>
            <div className="v-card-icon">💼</div>
            <h3 className="v-card-title">Office &amp; Business Accelerator</h3>
            <p className="v-card-desc">
              Automate your 9-to-5 without expensive Copilot or Jasper licenses. Complete workflows for Excel,
              PowerPoint, email diplomacy, and meeting minutes.
            </p>
            <ul className="v-card-list">
              <li>✓ Complex Excel &amp; Google Sheets Formula Generator</li>
              <li>✓ Executive Email &amp; Proposal Polisher</li>
              <li>✓ Free Meeting Audio-to-Action-Items Blueprint</li>
            </ul>
          </div>

          {/* Card 3: Creators & Social Media */}
          <div className="vault-card">
            <div className="v-card-icon">🎨</div>
            <h3 className="v-card-title">Creator &amp; Visual Studio Pack</h3>
            <p className="v-card-desc">
              Replace Midjourney &amp; ElevenLabs. 200+ battle-tested Flux photorealistic prompt formulas,
              viral TikTok/Reels voiceover scripts, and logo recipes.
            </p>
            <ul className="v-card-list">
              <li>✓ 80 Photorealistic Flux Lighting &amp; Lens Prompts</li>
              <li>✓ Kokoro Viral TTS Cadence &amp; Tone Settings</li>
              <li>✓ Zero-Install Browser Upscaler &amp; Background Remover</li>
            </ul>
          </div>
        </div>

        {/* Pricing & CTA Banner */}
        <div className="vault-cta-box">
          <div className="vault-pricing-info">
            <div className="vault-price-tag">
              <span className="price-struck">$49</span>
              <span className="price-current">$9</span>
              <span className="price-badge-saving">Save 82% Today</span>
            </div>
            <p className="vault-guarantee">
              ⚡ One-time payment • Lifetime free updates • 100% money-back guarantee
            </p>
          </div>

          <button
            type="button"
            className="btn-primary vault-buy-btn"
            onClick={handleOpenCheckout}
          >
            🚀 Get Instant Access to the Vault ($9)
          </button>
        </div>

        {/* Social Proof */}
        <div className="vault-testimonials">
          <div className="vault-testi-item">
            &ldquo;Saved me $20/mo on ChatGPT Plus and another $30 on Midjourney. The Flux prompt templates alone are worth 10x the price.&rdquo;
            <div className="testi-author">— Sarah K., University Student &amp; Freelancer</div>
          </div>
          <div className="vault-testi-item">
            &ldquo;Our 4-person agency cancelled 3 software seats after applying the free office workflows. Paid for itself in 5 minutes.&rdquo;
            <div className="testi-author">— Marco T., Small Business Founder</div>
          </div>
        </div>
      </div>

      {/* Embedded Checkout / Reservation Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content vault-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge">🎁</div>
                <div>
                  <h3 className="modal-title">Get The 2026 Free AI Starter Vault</h3>
                  <p className="modal-subtitle">Instant PDF &amp; Notion templates delivered to your inbox.</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            {purchased ? (
              <div className="modal-success-box">
                <div className="success-check-icon">✓</div>
                <h4>Access Granted &amp; Dispatched!</h4>
                <p>
                  Thank you! An email with your personal download link, Notion templates, and the 500+ prompt catalog has been sent to <strong>{buyerEmail || 'your email'}</strong>.
                </p>
                <button className="btn-primary" style={{ marginTop: '1.25rem' }} onClick={() => setIsModalOpen(false)}>
                  Close &amp; Continue Exploring
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="modal-form">
                <div className="checkout-summary-box">
                  <div className="summary-line">
                    <span>The 2026 Free AI Starter Vault (Lifetime)</span>
                    <strong>{selectedCurrency === 'usd' ? '$9.00 USD' : '350 ₺'}</strong>
                  </div>
                  <div className="summary-line sub">
                    <span>Included: 500+ Prompts + Video Workflows + Notion Hub</span>
                    <span className="free-tag">FREE BONUS</span>
                  </div>
                  <div className="currency-toggle">
                    <button
                      type="button"
                      className={`curr-btn ${selectedCurrency === 'usd' ? 'active' : ''}`}
                      onClick={() => setSelectedCurrency('usd')}
                    >
                      USD ($9)
                    </button>
                    <button
                      type="button"
                      className={`curr-btn ${selectedCurrency === 'try' ? 'active' : ''}`}
                      onClick={() => setSelectedCurrency('try')}
                    >
                      TRY (350 ₺ / Shopier)
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label">Your Email for Instant Delivery *</label>
                  <input
                    required
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                  />
                  <span className="form-helper">
                    🔒 256-Bit SSL Encrypted. Direct access link is generated upon payment.
                  </span>
                </div>

                <div className="payment-provider-badges">
                  <span>Supported Payouts:</span>
                  <span className="pay-badge">Apple Pay</span>
                  <span className="pay-badge">Google Pay</span>
                  <span className="pay-badge">Credit / Debit Card</span>
                  <span className="pay-badge">Shopier / TR IBAN</span>
                </div>

                <div className="modal-footer-actions">
                  <button type="button" className="btn-ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                    Pay {selectedCurrency === 'usd' ? '$9.00' : '350 ₺'} &amp; Download ⚡
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
