import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import ToolExplorer from './components/ToolExplorer'

function getTools() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'tools.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (err) {
    console.error('Error reading tools.json:', err)
    return []
  }
}

export default function Home() {
  const tools = getTools()

  return (
    <div className="home-page-root">
      {/* Background Animated Glowing Ambient Mesh */}
      <div className="ambient-mesh-wrap" aria-hidden="true">
        <div className="ambient-glow glow-purple"></div>
        <div className="ambient-glow glow-cyan"></div>
        <div className="ambient-glow glow-emerald"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Hero Header - Crisp & Direct */}
      <section className="hero-section" style={{ paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div className="hero-tag">
          <span className="live-sparkle">✨</span> Verified for 2026 • The Free AI People&apos;s Engine
        </div>
        <h1 className="hero-title">
          Stop Paying $100s for AI. <br />
          <span className="hero-gradient-text">Switch to 100% Free Alternatives.</span>
        </h1>
        <p className="hero-desc">
          For students, creators, and office professionals: replace Midjourney, ChatGPT Plus, and ElevenLabs with 1-click browser alternatives. Keep your money without sacrificing quality.
        </p>

        {/* Quick Route Shortcuts */}
        <div className="hero-actions-row">
          <Link href="/vault" className="btn-primary hero-btn-main">
            🎁 Get $9 Starter Vault
          </Link>
          <Link href="/calculator" className="btn-secondary hero-btn-vault">
            💰 Savings Calculator
          </Link>
          <Link href="/prompt-studio" className="btn-ghost hero-btn-secondary">
            ✍️ Prompt Studio
          </Link>
        </div>
      </section>

      {/* Main Interactive Tool Explorer (Live Search, Personas, 1-Click Web Filter) */}
      <ToolExplorer initialTools={tools} />
    </div>
  )
}
