'use client'

import React, { useState, useEffect } from 'react'
import ToolExplorer from './ToolExplorer'
import SavingsCalculator from './SavingsCalculator'
import StarterVault from './StarterVault'
import PromptStudio from './PromptStudio'

export default function TabbedHub({ tools }) {
  const [activeTab, setActiveTab] = useState('directory')

  // Support direct hash navigation (e.g. #calculator, #starter-vault, #explorer, #prompt-studio)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('calc')) {
        setActiveTab('calculator')
      } else if (hash.includes('vault')) {
        setActiveTab('vault')
      } else if (hash.includes('prompt')) {
        setActiveTab('prompts')
      } else if (hash.includes('explorer') || hash.includes('tools')) {
        setActiveTab('directory')
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const tabs = [
    {
      id: 'directory',
      label: 'Free Tools Directory',
      icon: '🔍',
      badge: '50+ Verified',
      color: 'cyan',
    },
    {
      id: 'calculator',
      label: 'Savings Calculator',
      icon: '💰',
      badge: 'Interactive Audit',
      color: 'emerald',
    },
    {
      id: 'vault',
      label: 'Starter Vault ($9)',
      icon: '🎁',
      badge: 'Workflows & Prompts',
      color: 'pink',
    },
    {
      id: 'prompts',
      label: 'Prompt Studio',
      icon: '✍️',
      badge: 'Formula Builder',
      color: 'purple',
    },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    // Smooth scroll tab into view if needed
    const hubElement = document.getElementById('main-hub')
    if (hubElement) {
      hubElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div id="main-hub" className="tabbed-hub-root">
      {/* Sticky / Floating Segmented Tab Switcher Bar */}
      <div className="hub-tabs-wrapper">
        <div className="hub-tabs-container">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                className={`hub-tab-btn ${isActive ? `active active-${tab.color}` : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className="hub-tab-icon">{tab.icon}</span>
                <span className="hub-tab-label">{tab.label}</span>
                <span className="hub-tab-badge">{tab.badge}</span>
                {isActive && <span className="hub-tab-active-indicator"></span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Dynamic Tab Content Panels */}
      <div className="hub-tab-content-area">
        {activeTab === 'directory' && (
          <div className="tab-pane fade-in-active">
            <ToolExplorer initialTools={tools} />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="tab-pane fade-in-active">
            <section id="calculator" className="calculator-section" style={{ marginTop: '1rem' }}>
              <SavingsCalculator />
            </section>
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="tab-pane fade-in-active">
            <StarterVault />
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="tab-pane fade-in-active">
            <PromptStudio />
          </div>
        )}
      </div>
    </div>
  )
}
