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
      label: '⚡ 50+ Free Tools Directory',
      icon: '🔍',
      badge: 'Active',
      color: 'cyan',
    },
    {
      id: 'calculator',
      label: '💰 Savings Calculator',
      icon: '📊',
      badge: 'Audit',
      color: 'emerald',
    },
    {
      id: 'vault',
      label: '🎁 $9 Starter Vault',
      icon: '🚀',
      badge: 'Shopier / BMC',
      color: 'pink',
    },
    {
      id: 'prompts',
      label: '✍️ Super-Prompt Studio',
      icon: '✨',
      badge: 'Formulas',
      color: 'purple',
    },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div id="main-hub" className="tabbed-hub-root">
      {/* Front & Center App Toolbar */}
      <div className="hub-tabs-wrapper">
        <div className="main-app-toolbar">
          <div className="toolbar-header-pill">
            <span className="toolbar-live-dot"></span>
            <span className="toolbar-title">TOOLBAR:</span>
          </div>

          <div className="toolbar-buttons-cluster">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`toolbar-tab-btn ${isActive ? `active active-${tab.color}` : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <span className="toolbar-tab-icon">{tab.icon}</span>
                  <span className="toolbar-tab-label">{tab.label}</span>
                  <span className="toolbar-tab-badge">{tab.badge}</span>
                </button>
              )
            })}
          </div>
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
            <section id="calculator" className="calculator-section" style={{ marginTop: '0.5rem' }}>
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
