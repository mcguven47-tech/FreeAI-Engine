'use client'

import React from 'react'

export function CommandPaletteTrigger() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cmd-k-nav-pill"
      title="Open Spotlight Search (Ctrl+K or ⌘K)"
    >
      <span className="cmd-k-icon">🔍</span>
      <span className="cmd-k-text">Quick Search</span>
      <kbd className="cmd-k-kbd">⌘K</kbd>
    </button>
  )
}

export function SubmitToolTrigger({ children, className = '' }) {
  const handleClick = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('open-submit-modal'))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || 'nav-btn-link'}
    >
      {children || 'Submit a Tool'}
    </button>
  )
}
