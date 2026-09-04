'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'

export default function ToolExplorer({ initialTools }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePersona, setActivePersona] = useState('all')
  const [webOnly, setWebOnly] = useState(false)
  const [votes, setVotes] = useState({})
  const [userVotes, setUserVotes] = useState({})

  // Load votes from localStorage
  useEffect(() => {
    try {
      const savedUserVotes = localStorage.getItem('freeai_user_votes')
      if (savedUserVotes) {
        setUserVotes(JSON.parse(savedUserVotes))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const handleUpvote = (altName) => {
    const isVoted = userVotes[altName]
    const updatedUserVotes = { ...userVotes, [altName]: !isVoted }
    setUserVotes(updatedUserVotes)

    try {
      localStorage.setItem('freeai_user_votes', JSON.stringify(updatedUserVotes))
    } catch (e) {
      console.error(e)
    }

    setVotes((prev) => {
      const current = prev[altName] || 0
      return {
        ...prev,
        [altName]: isVoted ? current - 1 : current + 1,
      }
    })
  }

  const personas = [
    { id: 'all', label: '⚡ Everyone / All Roles', icon: '🌟' },
    { id: 'students', label: '🎓 Students & Research', icon: '🎓' },
    { id: 'office', label: '💼 Office & Business', icon: '💼' },
    { id: 'creators', label: '🎨 Content Creators', icon: '🎨' },
    { id: 'daily', label: '☕ Everyday & Lifestyle', icon: '☕' },
    { id: 'devs', label: '💻 Developers & Tech', icon: '💻' },
  ]

  const personaToolMap = {
    students: ['chatgpt-plus', 'perplexity', 'wispr-flow', 'jasper'],
    office: ['chatgpt-plus', 'jasper', 'perplexity', 'skydive', 'wispr-flow'],
    creators: ['midjourney', 'elevenlabs', 'runway', 'jasper'],
    daily: ['chatgpt-plus', 'wispr-flow', 'midjourney', 'perplexity'],
    devs: ['cursor', 'chatgpt-plus', 'skydive'],
  }

  const categories = [
    { id: 'all', label: '⚡ All Categories' },
    { id: 'image', label: '🎨 Image & Art' },
    { id: 'chat', label: '✍️ Chat & Reasoning' },
    { id: 'code', label: '💻 Coding & Dev' },
    { id: 'audio', label: '🎙️ Voice & Audio' },
    { id: 'video', label: '🎬 Video & Animation' },
    { id: 'search', label: '🔍 Search & Research' },
    { id: 'agent', label: '🤖 AI Agents & Workflows' },
  ]

  // Helper to check if an alternative runs 100% in browser without terminal/GPU setup
  const isWebFriendlyAlt = (alt) => {
    const text = (alt.name + ' ' + alt.description + ' ' + (alt.cons || []).join(' ')).toLowerCase()
    if (text.includes('terminal') || text.includes('gpu to run locally') || text.includes('python setup') || text.includes('docker') || text.includes('self-hosting')) {
      return false
    }
    return true
  }

  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      // Persona filter
      if (activePersona !== 'all') {
        const allowedIds = personaToolMap[activePersona] || []
        if (!allowedIds.includes(tool.id)) return false
      }

      // Category filter
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
      if (!matchesCategory) return false

      // Web only filter (checks if at least one alternative is browser-friendly)
      if (webOnly) {
        const hasWebAlt = tool.alternatives.some(isWebFriendlyAlt)
        if (!hasWebAlt) return false
      }

      // Search query filter
      const query = searchQuery.toLowerCase().trim()
      if (!query) return true

      const matchesToolName = tool.name.toLowerCase().includes(query)
      const matchesDesc = tool.description.toLowerCase().includes(query)
      const matchesAlternatives = tool.alternatives.some(
        (alt) =>
          alt.name.toLowerCase().includes(query) ||
          alt.description.toLowerCase().includes(query)
      )

      return matchesToolName || matchesDesc || matchesAlternatives
    })
  }, [initialTools, activePersona, activeCategory, webOnly, searchQuery])

  // Compact View: Show top 3 by default to eliminate long vertical scrolling
  const [displayLimit, setDisplayLimit] = useState(3)
  const isFiltering = !!searchQuery || activeCategory !== 'all' || activePersona !== 'all' || webOnly
  const displayedTools = isFiltering || displayLimit === null
    ? filteredTools
    : filteredTools.slice(0, displayLimit)

  // Total savings across the catalog
  const totalYearlySavings = useMemo(() => {
    return initialTools.reduce((acc, t) => acc + (t.priceYearly || 0), 0)
  }, [initialTools])

  return (
    <section id="explorer" className="explorer-section">
      {/* Annual Savings Metric Ticker */}
      <div className="savings-ticker">
        <span className="ticker-icon">💰</span>
        <span>
          Replace these <strong>{initialTools.length} tools</strong> and save{' '}
          <strong>${totalYearlySavings.toLocaleString()}/year</strong> with 100% free alternatives.
        </span>
      </div>

      {/* Target Persona Selection Bar (Who are you?) */}
      <div className="persona-selector-container">
        <div className="persona-heading">
          <span className="persona-pulse-dot"></span>
          <span>Find Free AI by Your Role:</span>
        </div>
        <div className="persona-pills-row">
          {personas.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`persona-pill ${activePersona === p.id ? 'active' : ''}`}
              onClick={() => setActivePersona(p.id)}
            >
              <span className="p-icon">{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instant Search Bar + Web-Only Toggle */}
      <div className="search-box-container">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search expensive tools (Midjourney, ChatGPT, Cursor, ElevenLabs, Runway)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* 1-Click Web App Toggle */}
        <button
          type="button"
          className={`web-toggle-btn ${webOnly ? 'active' : ''}`}
          onClick={() => setWebOnly(!webOnly)}
          title="Filter only tools that open in your browser with zero installation"
        >
          <span className="web-toggle-icon">🌐</span>
          <span>1-Click Browser Apps (No Install)</span>
          <span className="web-toggle-check">{webOnly ? '✓ On' : 'Off'}</span>
        </button>
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
        <div className="results-header-left">
          <h3>
            Showing {filteredTools.length} Comparison{filteredTools.length === 1 ? '' : 's'}
          </h3>
          {activePersona !== 'all' && (
            <span className="persona-active-badge">
              Filtered for {personas.find((p) => p.id === activePersona)?.label}
            </span>
          )}
          {webOnly && (
            <span className="web-active-badge">🌐 Browser Only</span>
          )}
        </div>

        {/* Tip Jar Callout */}
        <button
          type="button"
          className="tip-jar-quick-btn"
          onClick={() => window.dispatchEvent(new CustomEvent('open-tip-modal'))}
        >
          ☕ Tip a Coffee ($3)
        </button>
      </div>

      {/* Tool Comparison Cards */}
      {filteredTools.length === 0 ? (
        <div className="no-results-box">
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔎</div>
          <h4>No tools matched your current filters</h4>
          <p>Try resetting the persona or searching for Midjourney, Cursor, ChatGPT, Runway, or ElevenLabs.</p>
          <button
            className="btn-primary"
            onClick={() => {
              setSearchQuery('')
              setActiveCategory('all')
              setActivePersona('all')
              setWebOnly(false)
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="tools-comparison-grid">
          {displayedTools.map((tool) => (
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
                  <span>✨ Top Free &amp; Open Alternatives:</span>
                </div>

                <div className="alternatives-list">
                  {tool.alternatives.map((alt, index) => {
                    const baseVotes = 180 + (index === 0 ? 140 : index === 1 ? 85 : 42) + alt.pros.length * 12
                    const currentVotes = baseVotes + (votes[alt.name] || 0) + (userVotes[alt.name] ? 1 : 0)
                    const isVoted = !!userVotes[alt.name]
                    const isBrowserFriendly = isWebFriendlyAlt(alt)

                    return (
                      <div key={index} className="alt-item">
                        <div className="alt-top-row">
                          <div className="alt-name-group">
                            <span className="alt-rank">#{index + 1}</span>
                            <strong className="alt-name">{alt.name}</strong>
                            <span className={`alt-badge-pill ${alt.type}`}>
                              {alt.badge}
                            </span>
                            {isBrowserFriendly ? (
                              <span className="alt-ease-pill web-ease">
                                🌐 1-Click Web
                              </span>
                            ) : (
                              <span className="alt-ease-pill local-ease">
                                🖥️ Desktop / Local
                              </span>
                            )}
                          </div>

                          <div className="alt-actions-group">
                            <button
                              type="button"
                              className={`upvote-pill ${isVoted ? 'voted' : ''}`}
                              onClick={() => handleUpvote(alt.name)}
                              title={isVoted ? 'Upvoted' : 'Upvote this free alternative'}
                            >
                              <span className="upvote-arrow">▲</span>
                              <span className="upvote-number">{currentVotes}</span>
                            </button>
                            <a
                              href={alt.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="alt-launch-btn"
                            >
                              Try Free ↗
                            </a>
                          </div>
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
                    )
                  })}
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

      {/* Compact View: Show More / Collapse Controls */}
      {!isFiltering && filteredTools.length > 3 && (
        <div className="load-more-section">
          {displayLimit !== null ? (
            <div className="load-more-inner">
              <button
                type="button"
                className="btn-load-more"
                onClick={() => setDisplayLimit(null)}
              >
                <span>⚡ Show All {filteredTools.length} Free Comparison Stacks</span>
                <span className="load-more-pill">+{filteredTools.length - displayLimit} More</span>
              </button>
              <p className="load-more-subtext">
                Or use the search bar / category pills above to instantly find any tool.
              </p>
            </div>
          ) : (
            <div className="load-more-inner">
              <button
                type="button"
                className="btn-collapse"
                onClick={() => {
                  setDisplayLimit(3)
                  const el = document.getElementById('explorer')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                ▲ Collapse to Top 3 Featured Tools
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
