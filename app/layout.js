import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import './globals.css'
import CommandPalette from './components/CommandPalette'
import SubmitModal from './components/SubmitModal'
import TipJarModal from './components/TipJarModal'
import { CommandPaletteTrigger, SubmitToolTrigger, TipModalTrigger } from './components/NavTriggers'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'FreeAI Engine — 100% Free Alternatives to Expensive AI Subscriptions',
  description: 'Stop paying $20–$50/month for Midjourney, ChatGPT Plus, ElevenLabs, and Cursor. Discover the best free, freemium, and open-source AI alternatives with zero hidden fees.',
  keywords: 'free ai tools, midjourney alternatives, chatgpt free alternatives, cursor free alternatives, open source ai, free prompt generator',
  openGraph: {
    title: 'FreeAI Engine — 100% Free Alternatives to Expensive AI Subscriptions',
    description: 'Stop paying $100s for AI. Switch to 100% free, open-source replacements for Midjourney, ChatGPT, ElevenLabs & Cursor.',
    url: 'https://freeai-engine.vercel.app',
    siteName: 'FreeAI Engine',
    images: [
      {
        url: '/images/hero-workflow.jpg',
        width: 1200,
        height: 630,
        alt: 'FreeAI Engine Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeAI Engine — 100% Free Alternatives to Expensive AI Subscriptions',
    description: 'Stop paying $100s for AI. Switch to 100% free, open-source replacements for Midjourney, ChatGPT, ElevenLabs & Cursor.',
    images: ['/images/hero-workflow.jpg'],
  },
}

function getTools() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'tools.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (err) {
    console.error('Error reading tools.json in layout:', err)
    return []
  }
}

export default function RootLayout({ children }) {
  const tools = getTools()

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="site-wrapper">
          <header className="header">
            <div className="header-inner">
              <a href="/" className="logo-group">
                <div className="logo-orb">
                  <span>⚡</span>
                </div>
                <div className="logo-text">
                  FreeAI <span className="logo-gradient">Engine</span>
                </div>
              </a>

              <div className="savings-pill">
                <span className="live-dot"></span>
                <span>$1.4M+ Community Savings</span>
              </div>

              {/* Center Command Palette Trigger Button */}
              <CommandPaletteTrigger />

              <nav className="nav-links">
                <Link href="/" className="nav-link">
                  🔍 Free Tools
                </Link>
                <Link href="/vault" className="nav-link vault-nav-link">
                  🎁 Starter Vault ($9)
                </Link>
                <Link href="/calculator" className="nav-link">
                  💰 Calculator
                </Link>
                <Link href="/prompt-studio" className="nav-link">
                  ✍️ Prompt Studio
                </Link>
                <Link href="/about" className="nav-link">
                  📖 About Us
                </Link>
                <TipModalTrigger className="coffee-nav-btn" />
                <SubmitToolTrigger className="btn-secondary-nav">
                  + Submit Tool
                </SubmitToolTrigger>
              </nav>
            </div>
          </header>

          <main className="main-content">{children}</main>

          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <div className="logo-group">
                  <div className="logo-orb">
                    <span>⚡</span>
                  </div>
                  <div className="logo-text">
                    FreeAI <span className="logo-gradient">Engine</span>
                  </div>
                </div>
                <p className="footer-desc">
                  FreeAI Engine is the open community index of 100% free, freemium, and open-source alternatives to expensive proprietary AI software. Curated, benchmarked, and updated daily.
                </p>
              </div>

              <div className="footer-links-group">
                <div className="footer-col">
                  <h4>Top Alternatives</h4>
                  <a href="/alternatives/midjourney-free-alternatives">Midjourney Alternatives</a>
                  <a href="/alternatives/chatgpt-plus-free-alternatives">ChatGPT Plus Alternatives</a>
                  <a href="/alternatives/cursor-free-alternatives">Cursor AI Alternatives</a>
                  <a href="/alternatives/elevenlabs-free-alternatives">ElevenLabs Alternatives</a>
                  <a href="/alternatives/runway-free-alternatives">Runway Video Alternatives</a>
                  <a href="/alternatives/skydive-zapier-ai-free-alternatives">Skydive &amp; Zapier AI Alternatives</a>
                  <a href="/alternatives/wispr-flow-free-alternatives">Wispr Flow Voice Alternatives</a>
                </div>
                <div className="footer-col">
                  <h4>Platform</h4>
                  <Link href="/">🔍 Free Directory</Link>
                  <Link href="/vault">🎁 Starter Vault ($9)</Link>
                  <Link href="/calculator">💰 Savings Calculator</Link>
                  <Link href="/prompt-studio">✍️ Prompt Studio</Link>
                  <Link href="/about">📖 About Us</Link>
                  <SubmitToolTrigger className="footer-link-btn">
                    + Submit a Tool
                  </SubmitToolTrigger>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} FreeAI Engine. Helping creators save millions.</p>
              <div style={{ color: 'var(--text-muted)' }}>
                <span>Verified for 2026</span>
              </div>
            </div>
          </footer>
        </div>

        {/* Global Mounts: Command Palette, Modals & Vercel Analytics */}
        <CommandPalette tools={tools} />
        <SubmitModal />
        <TipJarModal />
        <Analytics />
      </body>
    </html>
  )
}
