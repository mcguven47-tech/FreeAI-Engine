import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

function getToolsData() {
  const filePath = path.join(process.cwd(), 'data', 'tools.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

export async function generateStaticParams() {
  const tools = getToolsData()
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }) {
  const tools = getToolsData()
  const tool = tools.find((t) => t.slug === params.slug)

  if (!tool) {
    return { title: 'Alternatives Not Found' }
  }

  return {
    title: `Best Free ${tool.name} Alternatives in 2026 (Save $${tool.priceYearly}/yr) | FreeAI Engine`,
    description: `Stop paying $${tool.priceMonthly}/month for ${tool.name}. Discover the top free, freemium, and open-source alternatives verified for quality and speed.`,
  }
}

export default function AlternativePage({ params }) {
  const tools = getToolsData()
  const tool = tools.find((t) => t.slug === params.slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="alternative-page-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumbs-nav">
        <Link href="/" className="back-link">
          ← Back to All Free Alternatives
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{tool.name} Alternatives</span>
      </nav>

      {/* Page Header */}
      <header className="alt-page-header">
        <div className="badges-row">
          <span className="badge badge-tag">{tool.categoryLabel}</span>
          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            ✓ 2026 Verified List
          </span>
          <span className="badge badge-savings">
            💰 Save ${tool.priceYearly}/Year
          </span>
        </div>

        <h1 className="alt-page-title">
          The Best Free <span className="hero-gradient-text">{tool.name}</span> Alternatives in 2026
        </h1>

        <p className="alt-page-subtitle">
          {tool.name} costs <strong style={{ color: '#f87171' }}>${tool.priceMonthly}/month (${tool.priceYearly}/year)</strong>. 
          Here are the top-rated open-source and free alternatives that deliver matching or superior results with zero recurring fees.
        </p>
      </header>

      {/* Quick Verdict Box */}
      <div className="verdict-card">
        <div className="verdict-title">
          <span>💡</span> The Quick Verdict
        </div>
        <p className="verdict-text">
          If you want an exact replacement for <strong>{tool.name}</strong> without spending a dime, start with{' '}
          <strong style={{ color: '#38bdf8' }}>{tool.alternatives[0].name}</strong>. It offers {tool.alternatives[0].badge.toLowerCase()} and requires zero monthly commitments.
        </p>
      </div>

      {/* In-Depth Alternatives Breakdown */}
      <div className="detailed-alternatives-list">
        <h2 className="section-subheading">In-Depth Comparison of Top Replacements</h2>

        {tool.alternatives.map((alt, idx) => (
          <div key={idx} className="alt-deep-card">
            <div className="alt-deep-header">
              <div className="alt-deep-rank-group">
                <div className="rank-circle">#{idx + 1}</div>
                <div>
                  <h3 className="alt-deep-name">{alt.name}</h3>
                  <span className={`alt-badge-pill ${alt.type}`}>{alt.badge}</span>
                </div>
              </div>

              <a
                href={alt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
              >
                Launch {alt.name} ↗
              </a>
            </div>

            <p className="alt-deep-desc">{alt.description}</p>

            <div className="pros-cons-grid">
              <div className="pros-box">
                <h4 className="pros-title">✅ Why Choose {alt.name}:</h4>
                <ul>
                  {alt.pros.map((pro, pIdx) => (
                    <li key={pIdx}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div className="cons-box">
                <h4 className="cons-title">⚠️ Trade-offs & Limitations:</h4>
                <ul>
                  {alt.cons.map((con, cIdx) => (
                    <li key={cIdx}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="comparison-table-wrapper">
        <h2 className="section-subheading">Feature Matrix: {tool.name} vs. Free Alternatives</h2>
        <div className="table-responsive">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Software</th>
                <th>Price / Month</th>
                <th>Open Source</th>
                <th>Free Tier Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="expensive-row">
                <td>
                  <strong>{tool.name}</strong> <span className="expensive-tag">(Paid)</span>
                </td>
                <td style={{ color: '#f87171', fontWeight: '700' }}>${tool.priceMonthly}/mo</td>
                <td>❌ No</td>
                <td>❌ No</td>
                <td>Paid Only</td>
              </tr>
              {tool.alternatives.map((alt, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{alt.name}</strong>
                  </td>
                  <td style={{ color: '#34d399', fontWeight: '700' }}>$0 / Free</td>
                  <td>{alt.type === 'open-source' ? '✅ Yes' : '⚡ Web/Cloud'}</td>
                  <td>✅ 100% Free / Generous</td>
                  <td>
                    <a
                      href={alt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-link"
                    >
                      Try Free ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="faq-section">
        <h2 className="section-subheading">Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3 className="faq-q">Can free AI tools really match {tool.name}&apos;s quality?</h3>
          <p className="faq-a">
            Yes. In 2026, open-source models like Flux.1, DeepSeek, and Kokoro have closed the gap with proprietary tools. In many benchmarks, free and open-weights models either match or outperform expensive paid alternatives.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-q">Do I need an expensive GPU to run these alternatives?</h3>
          <p className="faq-a">
            Not necessarily. While tools like Fooocus or F5-TTS can run locally on an 8GB+ GPU, tools like Google Gemini, Claude Free, and Leonardo.ai run completely in your web browser with zero local hardware requirements.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-q">How much will I save each year?</h3>
          <p className="faq-a">
            By switching from {tool.name} to any of the recommended alternatives above, you save exactly <strong>${tool.priceYearly} per year</strong> in recurring subscription costs.
          </p>
        </div>
      </div>

      {/* CTA Footer Card */}
      <div className="alt-cta-card">
        <h3>Explore More Free AI Replacements</h3>
        <p>Browse our complete catalog of 50+ free replacements for expensive coding, video, and design tools.</p>
        <Link href="/#explorer" className="btn-primary">
          Back to Directory Explorer
        </Link>
      </div>
    </div>
  )
}
