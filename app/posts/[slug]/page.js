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
  
  return (
    <article className="glass-card" style={{ padding: '3rem' }}>
      <Link href="/" style={{ color: 'var(--accent-color)', fontWeight: 'bold', display: 'inline-block', marginBottom: '2rem' }}>
        &larr; Back to Articles
      </Link>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{postData.title}</h1>
        <div style={{ color: 'var(--text-secondary)' }}>
          <time>{postData.date}</time> • <span>By NexusAI Agent</span>
        </div>
      </header>
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </article>
  )
}
