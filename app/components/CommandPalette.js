'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'

export default function CommandPalette({ tools = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  // Listen for Cmd+K / Ctrl+K and custom trigger event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const handleCustomOpen = () => {
      setIsOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleCustomOpen)
    }
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Flatten searchable items (both paid tools and free alternatives)
  const allItems = useMemo(() => {
    const list = []
    tools.forEach((tool) => {
      // Add the expensive tool entry
      list.push({
        id: `tool-${tool.id}`,
        title: `${tool.name} (Save $${tool.priceYearly}/yr)`,
        subtitle: `Replace with: ${tool.alternatives.map((a) => a.name).join(', ')}`,
        category: tool.categoryLabel,
        url: `/alternatives/${tool.slug}`,
        isExternal: false,
        icon: '💰'
      })

      // Add each free alternative entry
      tool.alternatives.forEach((alt) => {
        list.push({
          id: `alt-${tool.id}-${alt.name}`,
          title: alt.name,
          subtitle: `100% Free replacement for ${tool.name} • ${alt.badge}`,
          category: tool.categoryLabel,
          url: alt.url,
          isExternal: true,
          icon: '⚡'
        })
      })
    })
    return list
  }, [tools])

  // Filter based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8)
    const q = query.toLowerCase()
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    ).slice(0, 10)
  }, [query, allItems])

  // Keyboard navigation within list
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selectedItem = filteredItems[selectedIndex]
      if (selectedItem) {
        if (selectedItem.isExternal) {
          window.open(selectedItem.url, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = selectedItem.url
        }
        setIsOpen(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="palette-overlay" onClick={() => setIsOpen(false)}>
      <div className="palette-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="palette-input-wrap">
          <span className="palette-search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="palette-input"
            placeholder="Type any tool, model, or category... (e.g. Midjourney, DeepSeek, Voice)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
          />
          <span className="palette-esc-badge" onClick={() => setIsOpen(false)}>
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="palette-results-list">
          {filteredItems.length === 0 ? (
            <div className="palette-empty-state">
              <span>No matching free tools or alternatives found.</span>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  className={`palette-item ${isSelected ? 'selected' : ''}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    if (item.isExternal) {
                      window.open(item.url, '_blank', 'noopener,noreferrer')
                    } else {
                      window.location.href = item.url
                    }
                    setIsOpen(false)
                  }}
                >
                  <div className="palette-item-icon">{item.icon}</div>
                  <div className="palette-item-content">
                    <div className="palette-item-title">{item.title}</div>
                    <div className="palette-item-subtitle">{item.subtitle}</div>
                  </div>
                  <div className="palette-item-right">
                    <span className="palette-cat-tag">{item.category}</span>
                    <span className="palette-enter-hint">{isSelected ? '↵ Select' : ''}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="palette-footer">
          <div className="palette-hints">
            <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to launch</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
          <div className="palette-footer-brand">
            ⚡ FreeAI Spotlight
          </div>
        </div>
      </div>
    </div>
  )
}
