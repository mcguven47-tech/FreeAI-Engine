import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Hakkımızda — FreeAI Engine',
  description: 'FreeAI Engine neden kuruldu? Açık kaynaklı yapay zeka hareketini ve misyonumuzu keşfedin.',
}

export default function AboutPage() {
  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="category-pill-sm" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          📖 BİZ KİMİZ?
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#ffffff' }}>
          Yapay Zeka <span className="hero-gradient-text">Herkes İçin Özgür Olmalı</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
          Pahalı aboneliklerle öğrencileri ve üreticileri dışlayan kapalı yapay zeka sistemlerine karşı, açık kaynaklı ve 100% ücretsiz alternatifleri bir araya getiren bağımsız hareketiz.
        </p>
      </div>

      <div className="about-content-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', padding: '3rem 2.5rem', backdropFilter: 'blur(20px)', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>
          🚀 Neden FreeAI Engine?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Bugün büyük şirketler Midjourney, ChatGPT Plus, Cursor ve ElevenLabs gibi araçlar için ayda $20 ila $50 talep ediyor. Bir öğrenci, bağımsız çalışan veya küçük bir esnaf için bu maliyetler yılda binlerce doları buluyor.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
          Oysa açık kaynak dünyasında Flux.1, DeepSeek, Kokoro ve Continue.dev gibi devrim niteliğinde ücretsiz alternatifler var. Amacımız bu araçları test edip, tek bir merkezde halkın kullanımına sunmak.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.4rem' }}>%100 Bağımsız</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Girişim sermayesi almadan, tamamen topluluk odaklı çalışıyoruz.</p>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.4rem' }}>Gizlilik ve Güven</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Kullanıcı verisi satmaz, yerel ve şeffaf araçları destekleriz.</p>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☕</div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.4rem' }}>Topluluk Destekli</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Ziyaretçilerimizin Buy Me a Coffee ve Shopier destekleriyle ayaktayız.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px', padding: '3rem 2rem' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
          Bize Katılın ve Destek Olun
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          FreeAI Engine size para kazandırdıysa veya işinizi kolaylaştırdıysa ekibe bir kahve ısmarlayabilirsiniz.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://buymeacoffee.com/freeaiengine" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            ☕ Buy Me a Coffee Destek ($3)
          </a>
          <Link href="/vault" className="btn-ghost" style={{ padding: '0.85rem 2rem' }}>
            🎁 $9 Starter Vault Paketimiz
          </Link>
        </div>
      </div>
    </div>
  )
}
