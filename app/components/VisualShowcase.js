'use client'

import React, { useState } from 'react'

const TABS = [
  {
    id: 'pipeline',
    label: '⚡ Autonomous Workflow Pipeline',
    tag: 'Tines-Style Flow',
    image: '/images/hero-workflow.jpg',
    caption: 'End-to-end multi-model pipeline: Idea ➔ DeepSeek Reasoning ➔ Flux.1 Visuals ➔ Kokoro Voice Synthesis',
    stat: '100% Free / Zero API markup'
  },
  {
    id: 'creative',
    label: '🎨 8K Photorealistic Art Studio',
    tag: 'Midjourney Killer',
    image: '/images/creative-studio.jpg',
    caption: 'Local & cloud workstation powered by Flux.1 & Fooocus with zero subscriptions and complete prompt freedom',
    stat: 'Save $360/year'
  },
  {
    id: 'code',
    label: '💻 AI Developer IDE & Agent Suite',
    tag: 'Cursor Replacement',
    image: '/images/code-studio.jpg',
    caption: 'DeepSeek-V3 + Continue.dev running automated refactoring, multi-file edits, and agentic debugging in VS Code',
    stat: 'Save $240/year'
  }
]

export default function VisualShowcase() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0]

  return (
    <div className="visual-showcase-container">
      {/* Interactive Tabs Header */}
      <div className="showcase-tabs-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`showcase-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="tab-label">{tab.label}</span>
            <span className="tab-badge">{tab.tag}</span>
          </button>
        ))}
      </div>

      {/* Mac-Style High-Tech Window Frame */}
      <div className="showcase-window-frame">
        {/* Window Top Chrome Bar */}
        <div className="window-chrome-bar">
          <div className="window-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="window-title-chip">
            <span className="window-live-indicator"></span>
            <span>FreeAI Studio — {currentTab.label}</span>
          </div>
          <div className="window-status-pill">
            <span>{currentTab.stat}</span>
          </div>
        </div>

        {/* Dynamic Image Display with Ambient Glow */}
        <div className="showcase-image-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentTab.image}
            alt={currentTab.label}
            className="showcase-image"
          />
          <div className="image-bottom-gradient"></div>

          {/* Floating Live Badge */}
          <div className="floating-caption-overlay">
            <p className="caption-text">{currentTab.caption}</p>
            <a href="#explorer" className="caption-cta-link">
              Try Models Free ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
