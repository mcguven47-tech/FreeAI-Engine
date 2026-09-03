import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export default function Home() {
  const allPostsData = getSortedPostsData()
  const featuredPost = allPostsData.length > 0 ? allPostsData[0] : null
  const regularPosts = allPostsData.length > 1 ? allPostsData.slice(1) : allPostsData

  return (
    <div>
      {/* Hero Header */}
      <section className="hero-section">
        <div className="hero-tag">
          <span>🔥</span> Daily Autonomous Intelligence • September 2026
        </div>
        <h1 className="hero-title">
          The Frontier of AI & <br />
          <span className="hero-gradient-text">Modern Side Hustles</span>
        </h1>
        <p className="hero-desc">
          High-leverage strategies, automated workflows, and digital business blueprints written 100% autonomously by AI agents.
        </p>

        {/* Category Filter Pills */}
        <div className="categories-bar">
          <button className="cat-pill active">⚡ All Insights</button>
          <button className="cat-pill">💼 $5K/Mo Side Hustles</button>
          <button className="cat-pill">🤖 AI Tools & Agents</button>
          <button className="cat-pill">🚀 Productivity Workflows</button>
          <button className="cat-pill">📈 Passive Income</button>
        </div>
      </section>

      {/* Featured Spotlight Card */}
      {featuredPost && (
        <Link href={`/posts/${featuredPost.slug}`}>
          <div className="featured-card">
            <div className="featured-img-wrap">
              <img 
                src={featuredPost.image || `https://image.pollinations.ai/prompt/${encodeURIComponent(featuredPost.title)}%20cinematic%20futuristic%20aesthetic%203d%20glassmorphism?width=1200&height=630&nologo=true`} 
                alt={featuredPost.title}
                className="featured-img"
              />
            </div>
            <div className="featured-content">
              <div className="featured-label">
                <span>⭐</span> Editor&apos;s Featured Pick
              </div>
              <div className="badges-row">
                <span className="badge badge-tag">⚡ Top Story</span>
                <span className="badge badge-time">⏱️ 5 min read</span>
              </div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-desc">{featuredPost.description}</p>
              <div className="magazine-footer" style={{ border: 'none', padding: 0 }}>
                <span>Published {featuredPost.date}</span>
                <span className="read-btn" style={{ color: '#ec4899', fontWeight: '700' }}>
                  Read Full Guide &rarr;
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid of Articles */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Latest Dispatches</h3>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Showing {allPostsData.length} articles</span>
      </div>

      <div className="articles-grid">
        {regularPosts.map(({ slug, date, title, description, image }) => {
          const fallbackImg = `https://image.pollinations.ai/prompt/${encodeURIComponent(title)}%20minimalist%20futuristic%20tech%20illustration%203d%20glassmorphism?width=800&height=450&nologo=true`;
          const displayImg = image || fallbackImg;

          return (
            <Link href={`/posts/${slug}`} key={slug} style={{ display: 'block', height: '100%' }}>
              <div className="magazine-card">
                <div className="magazine-img-wrap">
                  <img 
                    src={displayImg} 
                    alt={title}
                    className="magazine-img"
                    loading="lazy"
                  />
                </div>
                <div className="magazine-body">
                  <div className="badges-row">
                    <span className="badge badge-tag">AI Playbook</span>
                    <span className="badge badge-time">⏱️ 4 min read</span>
                  </div>
                  <h3 className="magazine-title">{title}</h3>
                  <p className="magazine-desc">{description}</p>
                  <div className="magazine-footer">
                    <span>{date}</span>
                    <span className="read-btn">Read &rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* High-Converting Newsletter Card */}
      <section id="newsletter" className="newsletter-banner">
        <h3 className="newsletter-title">Stay Ahead of the AI Curve</h3>
        <p className="newsletter-desc">
          Get our daily autonomous digest of breaking AI tools, prompt templates, and digital monetization guides delivered directly to your inbox.
        </p>
        <form className="newsletter-form" action="#">
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            className="newsletter-input"
            required
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.75rem', cursor: 'pointer', border: 'none' }}>
            Subscribe Free
          </button>
        </form>
      </section>
    </div>
  )
}
