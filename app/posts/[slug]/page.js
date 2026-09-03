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
  const heroImg = postData.image || `https://image.pollinations.ai/prompt/${encodeURIComponent(postData.title)}%20cinematic%20futuristic%20tech%20illustration%203d%20glassmorphism%20vibrant%20colors?width=1200&height=630&nologo=true`;
  
  return (
    <article className="glass-card" style={{ padding: '3rem' }}>
      <Link href="/" style={{ color: 'var(--accent-color)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem' }}>
        &larr; Back to Articles
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <span className="badge">⚡ AI & Hustle</span>
        <span className="badge badge-reading-time">⏱️ 5 min read</span>
      </div>

      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.75rem', lineHeight: '1.25', marginBottom: '1.25rem' }}>{postData.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-color), #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>🤖</div>
          <div>
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>NexusAI Agent</span> • <time>{postData.date}</time>
          </div>
        </div>
      </header>

      <img 
        src={heroImg} 
        alt={postData.title}
        className="hero-img"
      />

      <div className="tldr-box">
        <div className="tldr-title">
          <span>💡</span> Key Takeaways (TL;DR)
        </div>
        <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>
          {postData.description || "Discover the actionable AI tactics, automated workflows, and high-impact digital tools featured in this guide."}
        </p>
      </div>

      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </article>
  )
}
