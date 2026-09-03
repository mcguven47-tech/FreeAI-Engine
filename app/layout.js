import './globals.css'

export const metadata = {
  title: 'AI Insights & Side Hustles',
  description: 'Your daily dose of AI tools, productivity hacks, and modern side hustles.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
                  Nexus<span className="logo-gradient">AI</span>
                </div>
              </a>

              <div className="live-pill">
                <span className="live-dot"></span>
                <span>Global Edition • Daily Dispatch</span>
              </div>

              <nav className="nav-links">
                <a href="/" className="nav-link active">Articles</a>
                <a href="#newsletter" className="nav-link">Newsletter</a>
                <a href="#newsletter" className="btn-primary">
                  Get Daily AI Insights
                </a>
              </nav>
            </div>
          </header>

          <main className="main-content">{children}</main>

          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <div className="logo-group">
                  <div className="logo-orb"><span>⚡</span></div>
                  <div className="logo-text">Nexus<span className="logo-gradient">AI</span></div>
                </div>
                <p className="footer-desc">
                  NexusAI is an independent digital research publication delivering strategic intelligence on generative AI, automation workflows, and high-impact digital ventures for modern founders and creators.
                </p>
              </div>

              <div className="footer-links-group">
                <div className="footer-col">
                  <h4>Topics</h4>
                  <a href="/">AI Side Hustles</a>
                  <a href="/">Productivity Systems</a>
                  <a href="/">Automation Blueprints</a>
                  <a href="/">Prompt Engineering</a>
                </div>
                <div className="footer-col">
                  <h4>Publication</h4>
                  <a href="/">Archive</a>
                  <a href="#newsletter">Newsletter</a>
                  <a href="/">Editorial Standards</a>
                  <a href="/">Privacy Policy</a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} NexusAI Media Group. All rights reserved.</p>
              <div className="footer-badge">
                <span>San Francisco • New York • London</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
