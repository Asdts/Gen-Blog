'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [siteId, setSiteId] = useState('')
  const router = useRouter()

  const handleGenerate = async () => {
    if (!prompt) return
    setLoading(true)

    const res = await fetch('/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: prompt,
        templateName: 'default-template'
      }),
    })

    const result = await res.json()
    if (result.id) {
      setSiteId(result.id)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🧠 AI Website Builder</h1>

      <input
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleGenerate()}
        placeholder="Describe your website idea..."
        className="w-full max-w-xl border rounded px-4 py-3 text-lg shadow"
      />

      {loading && <p className="mt-4 text-blue-600">Generating your site...</p>}

      {siteId && (
        <div className="mt-6">
          <p className="text-green-600">✅ Your site is ready!</p>
          <button
            onClick={() => router.push(`/preview/${siteId}`)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Your Website
          </button>
        </div>
      )}
    </main>
  )
}
