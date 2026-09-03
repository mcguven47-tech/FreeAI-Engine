import './globals.css'

export const metadata = {
  title: 'FreeAI Engine — 100% Free Alternatives to Expensive AI Subscriptions',
  description: 'Stop paying $20–$50/month for Midjourney, ChatGPT Plus, ElevenLabs, and Cursor. Discover the best free, freemium, and open-source AI alternatives with zero hidden fees.',
  keywords: 'free ai tools, midjourney alternatives, chatgpt free alternatives, cursor free alternatives, open source ai, free prompt generator',
}

export default function RootLayout({ children }) {
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

              <nav className="nav-links">
                <a href="/#explorer" className="nav-link">
                  Find Alternatives
                </a>
                <a href="/#prompt-studio" className="nav-link">
                  Prompt Studio
                </a>
                <a href="/#explorer" className="btn-primary">
                  Explore Free Tools
                </a>
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
                  <a href="/alternatives/skydive-zapier-ai-free-alternatives">Skydive & Zapier AI Alternatives</a>
                  <a href="/alternatives/wispr-flow-free-alternatives">Wispr Flow Voice Alternatives</a>
                </div>
                <div className="footer-col">
                  <h4>Platform</h4>
                  <a href="/#explorer">Directory Explorer</a>
                  <a href="/#prompt-studio">Super-Prompt Studio</a>
                  <a href="https://github.com/mcguven47-tech/freeai-engine" target="_blank" rel="noreferrer">
                    Community Index
                  </a>
                  <a href="/">Submit a Tool</a>
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
      </body>
    </html>
  )
}
