'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export default function ToolExplorer({ initialTools }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: '⚡ All Categories' },
    { id: 'image', label: '🎨 Image & Art' },
    { id: 'chat', label: '✍️ Chat & Reasoning' },
    { id: 'code', label: '💻 Coding & Dev' },
    { id: 'audio', label: '🎙️ Voice & Audio' },
    { id: 'video', label: '🎬 Video & Animation' },
    { id: 'search', label: '🔍 Search & Research' },
  ]

  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
      const query = searchQuery.toLowerCase().trim()
      if (!query) return matchesCategory

      const matchesName = tool.name.toLowerCase().includes(query)
      const matchesDesc = tool.description.toLowerCase().includes(query)
      const matchesAlt = tool.alternatives.some(
        (alt) => alt.name.toLowerCase().includes(query) || alt.description.toLowerCase().includes(query)
      )

      return matchesCategory && (matchesName || matchesDesc || matchesAlt)
    })
  }, [initialTools, activeCategory, searchQuery])

  const totalAnnualSavings = useMemo(() => {
    return initialTools.reduce((acc, curr) => acc + curr.priceYearly, 0)
  }, [initialTools])

  return (
    <section id="explorer" className="explorer-section">
      {/* Live Savings Counter Ticker */}
      <div className="savings-ticker">
        <span className="ticker-icon">💰</span>
        <span>
          Replace these {initialTools.length} tools and save{' '}
          <strong>${totalAnnualSavings.toLocaleString()}/year</strong> with 100% free alternatives.
        </span>
      </div>

      {/* Interactive Search Bar */}
      <div className="search-box-container">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Type an expensive tool (e.g. Midjourney, Cursor, ChatGPT, ElevenLabs)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="categories-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Comparison Grid Header */}
      <div className="results-header">
        <h3>
          Showing {filteredTools.length} Comparison{filteredTools.length === 1 ? '' : 's'}
        </h3>
        {searchQuery && (
          <span className="search-results-tag">Filtered by &quot;{searchQuery}&quot;</span>
        )}
      </div>

      {/* Tool Comparison Cards */}
      {filteredTools.length === 0 ? (
        <div className="no-results-box">
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔎</div>
          <h4>No tools matched &quot;{searchQuery}&quot;</h4>
          <p>Try searching for Midjourney, Cursor, ChatGPT, Runway, or ElevenLabs.</p>
          <button className="btn-primary" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="tools-comparison-grid">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="comparison-card">
              {/* Expensive Tool Header */}
              <div className="expensive-tool-header">
                <div className="expensive-left">
                  <div className="category-pill-sm">{tool.categoryLabel}</div>
                  <h3 className="expensive-name">{tool.name}</h3>
                  <p className="expensive-desc">{tool.description}</p>
                </div>

                <div className="expensive-price-box">
                  <div className="price-tag-strike">${tool.priceMonthly}/mo</div>
                  <div className="savings-badge">
                    Save ${tool.priceYearly}/yr
                  </div>
                </div>
              </div>

              {/* Free Alternatives Showcase */}
              <div className="alternatives-section">
                <div className="alternatives-label">
                  <span>✨ Top Free & Open-Source Alternatives:</span>
                </div>

                <div className="alternatives-list">
                  {tool.alternatives.map((alt, index) => (
                    <div key={index} className="alt-item">
                      <div className="alt-top-row">
                        <div className="alt-name-group">
                          <span className="alt-rank">#{index + 1}</span>
                          <strong className="alt-name">{alt.name}</strong>
                          <span className={`alt-badge-pill ${alt.type}`}>
                            {alt.badge}
                          </span>
                        </div>
                        <a
                          href={alt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="alt-launch-btn"
                        >
                          Try Free ↗
                        </a>
                      </div>

                      <p className="alt-desc">{alt.description}</p>

                      <div className="alt-pros-cons">
                        <div className="alt-pros">
                          {alt.pros.map((pro, pIdx) => (
                            <span key={pIdx} className="pro-tag">
                              ✓ {pro}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer with SEO Link */}
              <div className="comparison-card-footer">
                <span className="zero-cost-pill">100% Free Replacements</span>
                <Link href={`/alternatives/${tool.slug}`} className="deep-dive-link">
                  Detailed Feature Matrix &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
