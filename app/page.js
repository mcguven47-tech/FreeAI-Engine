import fs from 'fs'
import path from 'path'
import ToolExplorer from './components/ToolExplorer'
import PromptStudio from './components/PromptStudio'
import SavingsCalculator from './components/SavingsCalculator'
import Marquee from './components/Marquee'
import VisualShowcase from './components/VisualShowcase'
import StarterVault from './components/StarterVault'

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

      {/* Hero Header */}
      <section className="hero-section">
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

        {/* Action Buttons */}
        <div className="hero-actions-row">
          <a href="#calculator" className="btn-primary hero-btn-main">
            ⚡ Calculate My Savings
          </a>
          <a href="#starter-vault" className="btn-secondary hero-btn-vault">
            🎁 Get $9 Starter Vault
          </a>
          <a href="#explorer" className="btn-ghost hero-btn-secondary">
            🔍 Explore Free Tools
          </a>
        </div>
      </section>

      {/* Tines-Style Giant Interactive Visual Showcase Window */}
      <VisualShowcase />

      {/* Infinite Moving Marquee of Free Models */}
      <Marquee />

      {/* Interactive Tines-Style Savings Calculator & Node Connector */}
      <section id="calculator" className="calculator-section">
        <SavingsCalculator />
      </section>

      {/* Consumer Monetization: $9 Starter Vault & Ready-Made Workflows */}
      <StarterVault />

      {/* Main Interactive Tool Explorer (Live Search & Category Filter) */}
      <ToolExplorer initialTools={tools} />

      {/* Interactive Super-Prompt Studio */}
      <PromptStudio />

      {/* Tines-Inspired Value Manifesto Bento Grid */}
      <section className="manifesto-section">
        <div className="manifesto-badge">💎 The Open Source Advantage</div>
        <h3 className="manifesto-title">Why the Free Stack is Winning in 2026</h3>
        <p className="manifesto-desc">
          Proprietary AI companies charge $20 to $50/month to lock you into closed APIs. The open weights revolution has leveled the playing field.
        </p>

        <div className="manifesto-grid">
          <div className="manifesto-card">
            <div className="m-card-icon">⚡</div>
            <h4>Zero Compute Markup</h4>
            <p>
              Tools like Flux.1 and DeepSeek run with open weights. You pay $0 instead of paying a 500% markup on cloud subscription seats.
            </p>
          </div>
          <div className="manifesto-card">
            <div className="m-card-icon">🔒</div>
            <h4>Total Offline Privacy</h4>
            <p>
              Tools like Fooocus, Buzz (Whisper.cpp), and Continue.dev run locally on your hardware. Your data, voice, and code never leave your machine.
            </p>
          </div>
          <div className="manifesto-card">
            <div className="m-card-icon">🚀</div>
            <h4>Uncapped Creativity</h4>
            <p>
              No artificial message limits, no strict rate-limiting, and no random account bans. You own your workflow end-to-end.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
