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
          Pahalı Yapay Zekalara Servet Ödemeyin. <br />
          <span className="hero-gradient-text">%100 Ücretsiz Alternatifleri Keşfedin.</span>
        </h1>
        <p className="hero-desc">
          Öğrenciler, çalışanlar ve içerik üreticileri için: Midjourney, ChatGPT Plus ve ElevenLabs yerine tarayıcıda çalışan ücretsiz araçlar.
        </p>

        {/* Quick Route Shortcuts */}
        <div className="hero-actions-row">
          <Link href="/vault" className="btn-primary hero-btn-main">
            🎁 Ürünlerimiz ($9 Vault)
          </Link>
          <Link href="/calculator" className="btn-secondary hero-btn-vault">
            💰 Tasarruf Hesaplayıcı
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
