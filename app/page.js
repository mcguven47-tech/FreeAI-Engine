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

      <div style={{ display: 'grid', gap: '2rem' }}>
        {allPostsData.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No articles found. The agent is sleeping...</p>
        ) : (
          allPostsData.map(({ slug, date, title, description }) => (
            <Link href={`/posts/${slug}`} key={slug}>
              <div className="glass-card">
                <small style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{date}</small>
                <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{title}</h2>
                <p style={{ margin: 0 }}>{description}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
