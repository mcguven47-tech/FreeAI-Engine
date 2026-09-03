'use client'

import React from 'react'

const MARQUEE_ITEMS = [
  { name: 'Flux.1 Schnell', category: 'Image', tag: 'Open Weights' },
  { name: 'DeepSeek V3 & R1', category: 'Reasoning', tag: '671B MoE' },
  { name: 'Kokoro-82M', category: 'Audio/TTS', tag: 'Apache 2.0' },
  { name: 'Continue.dev', category: 'Code', tag: 'VS Code Extension' },
  { name: 'n8n Workflow Automation', category: 'AI Agents', tag: 'Fair-Code' },
  { name: 'Buzz & Whisper.cpp', category: 'Voice Dictation', tag: 'Local Offline' },
  { name: 'Fooocus SDXL', category: 'Art & Image', tag: 'Offline Local' },
  { name: 'Luma Dream Machine', category: 'Video', tag: '30 Free/Mo' },
  { name: 'Felo AI Search', category: 'Research', tag: 'Citations Free' },
  { name: 'Activepieces', category: 'Automation', tag: 'Open Source' },
  { name: 'Google Gemini 2.0 Flash', category: 'Multimodal', tag: '1M Context' },
]

export default function Marquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-label">
        <span>⚡ VERIFIED 100% FREE &amp; OPEN-SOURCE ECOSYSTEM:</span>
      </div>
      <div className="marquee-track">
        <div className="marquee-content">
          {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span className="marquee-item-dot"></span>
              <span className="marquee-item-name">{item.name}</span>
              <span className="marquee-item-cat">{item.category}</span>
              <span className="marquee-item-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
