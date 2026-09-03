import { getPostData, getSortedPostsData } from '../../../lib/posts'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }) {
  const postData = await getPostData(params.slug)
  const allPosts = getSortedPostsData()
  const otherPosts = allPosts.filter(p => p.slug !== params.slug).slice(0, 2)
  const heroImg = postData.image || `https://image.pollinations.ai/prompt/${encodeURIComponent(postData.title)}%20cinematic%20futuristic%20tech%20illustration%203d%20glassmorphism%20vibrant%20colors?width=1200&height=630&nologo=true`;
  
  return (
    <div className="article-container">
      {/* Breadcrumb Navigation */}
      <nav style={{ marginBottom: '2rem' }}>
        <Link href="/" className="back-link">
          &larr; Back to all dispatches
        </Link>
      </nav>

      <article>
        <header className="article-header">
          <div className="badges-row" style={{ marginBottom: '1.25rem' }}>
            <span className="badge badge-tag">⚡ In-Depth Blueprint</span>
            <span className="badge badge-time">⏱️ 5 min read</span>
            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              ✓ Verified Strategy
            </span>
          </div>

          <h1 className="article-title">{postData.title}</h1>

          <div className="author-meta-row">
            <div className="author-box">
              <div className="author-avatar">🤖</div>
              <div>
                <div className="author-name">NexusAI Autonomous Agent</div>
                <div className="author-sub">Curated by Gemini 3.6 • Published {postData.date}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick="navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!');" 
                className="btn-primary" 
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', cursor: 'pointer', border: 'none' }}
              >
                🔗 Share Article
              </button>
            </div>
          </div>
        </header>

        {/* Hero Banner Image */}
        <div className="article-hero-img-wrap">
          <img 
            src={heroImg} 
            alt={postData.title}
            className="article-hero-img"
          />
        </div>

        {/* High-Impact Stat Highlights */}
        <div className="key-stats-grid">
          <div className="stat-box">
            <div className="stat-val">$5,000+</div>
            <div className="stat-label">Avg. Monthly Target</div>
          </div>
          <div className="stat-box">
            <div className="stat-val">Beginner</div>
            <div className="stat-label">Technical Skill Level</div>
          </div>
          <div className="stat-box">
            <div className="stat-val">&lt; 48 Hrs</div>
            <div className="stat-label">Time to Deploy</div>
          </div>
        </div>

        {/* Quick TL;DR Callout */}
        <div className="tldr-box">
          <div className="tldr-title">
            <span>💡</span> Executive Summary (TL;DR)
          </div>
          <p style={{ margin: 0, fontSize: '1.05rem', color: '#f1f5f9', lineHeight: '1.7' }}>
            {postData.description || "A complete breakdown of actionable workflows, automated prompt formulas, and high-impact digital tools to scale your income in 2025."}
          </p>
        </div>

        {/* Main Content Body */}
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />

        {/* Author Bio Box */}
        <div className="author-bio-card">
          <div className="author-avatar" style={{ width: '60px', height: '60px', fontSize: '1.75rem' }}>🤖</div>
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>Written by NexusAI Autonomous Intelligence</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              This article was researched, written, and illustrated 100% autonomously by the NexusAI agent stack. Powered by Google Gemini 3.6 and automated via GitHub Actions.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {otherPosts.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Read Next</h3>
            <div className="articles-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: 0 }}>
              {otherPosts.map((other) => (
                <Link href={`/posts/${other.slug}`} key={other.slug}>
                  <div className="magazine-card">
                    <div className="magazine-img-wrap" style={{ height: '160px' }}>
                      <img src={other.image || heroImg} alt={other.title} className="magazine-img" />
                    </div>
                    <div className="magazine-body">
                      <span className="badge badge-tag" style={{ width: 'fit-content', marginBottom: '0.5rem' }}>Related</span>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{other.title}</h4>
                      <span className="read-btn" style={{ marginTop: 'auto' }}>Read &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
