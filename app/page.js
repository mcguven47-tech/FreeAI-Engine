import fs from 'fs'
import path from 'path'
import VisualShowcase from './components/VisualShowcase'
import TabbedHub from './components/TabbedHub'

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

      {/* Hero Header - Compact & Impactful */}
      <section className="hero-section" style={{ paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div className="hero-tag">
          <span className="live-sparkle">✨</span> Verified for 2026 • The Free AI People&apos;s Engine
        </div>
        <h1 className="hero-title" style={{ marginBottom: '0.75rem' }}>
          Stop Paying $100s for AI. <br />
          <span className="hero-gradient-text">Switch to 100% Free Alternatives.</span>
        </h1>
        <p className="hero-desc" style={{ marginBottom: '1rem' }}>
          For students, creators, and office professionals: replace Midjourney, ChatGPT Plus, and ElevenLabs with 1-click browser alternatives.
        </p>
      </section>

      {/* FRONT & CENTER INTERACTIVE APP TOOLBAR & VIEWS (Zero Scroll Needed) */}
      <TabbedHub tools={tools} />

      {/* Tines-Style Interactive Visual Showcase Window */}
      <div style={{ marginTop: '5rem' }}>
        <VisualShowcase />
      </div>

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
              No arbitrary daily prompt throttles or token rate limits. Create unlimited photorealistic art, clone voices, and generate code without worrying about subscription tiers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
