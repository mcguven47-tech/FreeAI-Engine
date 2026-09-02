import './globals.css'

export const metadata = {
  title: 'AI Insights & Side Hustles',
  description: 'Your daily dose of AI tools, productivity hacks, and modern side hustles.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="logo">NexusAI.</div>
            <nav style={{display: 'flex', gap: '1rem'}}>
              <a href="/" style={{color: 'var(--text-secondary)'}}>Articles</a>
              <a href="#" style={{color: 'var(--text-secondary)'}}>About</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer style={{textAlign: 'center', marginTop: '4rem', padding: '2rem 0', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)'}}>
            © {new Date().getFullYear()} NexusAI. Generated autonomously.
          </footer>
        </div>
      </body>
    </html>
  )
}
