import fs from 'fs'
import path from 'path'
import ToolExplorer from './components/ToolExplorer'
import PromptStudio from './components/PromptStudio'

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
    <div>
      {/* Hero Header */}
      <section className="hero-section">
        <div className="hero-tag">
          <span>🔥</span> Verified for 2026 • 100% Free & Open-Source Index
        </div>
        <h1 className="hero-title">
          Stop Paying $100s for AI. <br />
          <span className="hero-gradient-text">Switch to Free Alternatives.</span>
        </h1>
        <p className="hero-desc">
          Compare expensive proprietary AI tools against battle-tested free, freemium, and open-source replacements. Keep your money without sacrificing quality.
        </p>
      </section>

      {/* Main Interactive Tool Explorer (Live Search & Category Filter) */}
      <ToolExplorer initialTools={tools} />

      {/* Interactive Super-Prompt Studio */}
      <PromptStudio />

      {/* Mission & FAQ Callout */}
      <section style={{ maxWidth: '800px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Why Did We Build FreeAI Engine?
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
          AI shouldn&apos;t be a $200/month luxury subscription stack. The open-source community (Flux, DeepSeek, Ollama, Kokoro) has created world-class models that run for free. FreeAI Engine bridges the gap so creators, developers, and students never overpay again.
        </p>
      </section>
    </div>
  )
}
