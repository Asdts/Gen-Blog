// Updated HomePage.tsx with browser-safe localStorage access and ShadCN UI
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [siteId, setSiteId] = useState('')
  const [userApiKey, setUserApiKey] = useState('')
  const [siteList, setSiteList] = useState<string[]>([])
  const [sessionId, setSessionId] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let existing = localStorage.getItem('sessionId')
      if (!existing) {
        existing = crypto.randomUUID()
        localStorage.setItem('sessionId', existing)
      }
      setSessionId(existing)

      const storedIds = JSON.parse(localStorage.getItem('siteIds') || '[]')
      setSiteList(storedIds)
    }
  }, [])

  useEffect(() => {
    if (siteId && typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('siteIds') || '[]')
      localStorage.setItem('siteIds', JSON.stringify([...new Set([...stored, siteId])]))
    }
  }, [siteId])

  const handleGenerate = async () => {
    if (!prompt) return
    setLoading(true)

    const res = await fetch('/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: prompt,
        templateName: 'default-template',
        apiKey: userApiKey,
        sessionId
      }),
    })

    const result = await res.json()
    if (result.id) {
      setSiteId(result.id)
      router.push(`/preview/${result.id}`)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-10 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">🧠 AI Website Generator</h1>
        <p className="text-gray-500 text-lg">Describe what site you want and watch it get built</p>
      </div>

      <div className="w-full space-y-4">
        <Input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          placeholder="Describe your website idea..."
        />

        <Input
          value={userApiKey}
          onChange={e => setUserApiKey(e.target.value)}
          placeholder="Optional: Enter your Gemini API key..."
        />

        <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
          {loading ? 'Generating...' : 'Generate Site'}
        </Button>
      </div>

      {siteList.length > 0 && (
        <div className="w-full">
          <Separator className="my-6" />
          <h2 className="text-xl font-semibold mb-4">📁 Recently Generated Sites</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {siteList.map(id => (
              <Card key={id} className="cursor-pointer hover:shadow-md transition">
                <CardHeader>
                  <CardTitle className="text-base">Site ID: {id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Preview your generated content</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="secondary" onClick={() => router.push(`/preview/${id}`)}>View</Button>
                  <Button variant="link" onClick={() => router.push('/sites')}>Go to All Sites</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}