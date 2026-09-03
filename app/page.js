import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <div>
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ background: 'linear-gradient(to right, var(--accent-color), #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
          Discover the Future of Work.
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '1rem auto' }}>
          Latest insights on AI tools, automation, and digital side hustles to 10x your productivity.
        </p>
      </section>

      <div className="articles-grid">
        {allPostsData.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>No articles found. The agent is sleeping...</p>
        ) : (
          allPostsData.map(({ slug, date, title, description, image }) => {
            const fallbackImg = `https://image.pollinations.ai/prompt/${encodeURIComponent(title)}%20minimalist%20futuristic%20tech%20illustration%203d%20glassmorphism?width=800&height=450&nologo=true`;
            const displayImg = image || fallbackImg;

            return (
              <Link href={`/posts/${slug}`} key={slug} style={{ display: 'block', height: '100%' }}>
                <div className="glass-card">
                  <div className="card-img-wrap">
                    <img 
                      src={displayImg} 
                      alt={title}
                      className="card-img"
                      loading="lazy"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <span className="badge">⚡ AI & Hustle</span>
                    <span className="badge badge-reading-time">⏱️ 4 min read</span>
                  </div>
                  <h2 style={{ fontSize: '1.35rem', lineHeight: '1.4', marginBottom: '0.75rem', fontWeight: '700' }}>{title}</h2>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', flex: 1 }}>{description}</p>
                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span>{date}</span>
                    <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>Read Article &rarr;</span>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
