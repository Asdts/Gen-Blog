// /app/sites/page.tsx - Interactive Site Explorer with ShadCN UI
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

type Site = {
  _id: string
  title: string
  slug: string
  fullPath: string
  createdAt: string
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(false)
  const [newTopic, setNewTopic] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchSites = async () => {
      const sessionId = localStorage.getItem('sessionId')
      if (!sessionId) return

      setLoading(true)
      const res = await fetch('/api/user-sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      const data = await res.json()
      if (data.sites) setSites(data.sites)
      setLoading(false)
    }

    fetchSites()
  }, [])

  const handleOpen = (id: string) => {
    router.push(`/preview/${id}`)
  }

  const handleGenerate = async () => {
    const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID()
    localStorage.setItem('sessionId', sessionId)

    const res = await fetch('/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: newTopic, sessionId })
    })

    const data = await res.json()
    if (data.id) {
      router.push(`/preview/${data.id}`)
    }
  }

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">🗂 Your Generated Sites</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
          ))}
        </div>
      ) : sites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sites.map(site => (
            <Card key={site._id} onClick={() => handleOpen(site._id)} className="cursor-pointer hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{site.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p className="truncate">{site.fullPath}</p>
                <p className="text-xs text-gray-400 mt-1">Created: {new Date(site.createdAt).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No sites found for this session.</p>
      )}

      <Separator className="my-4" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">🆕 Generate New Site</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            value={newTopic}
            onChange={e => setNewTopic(e.target.value)}
            placeholder="Enter a topic to generate new site"
            className="flex-grow"
          />
          <Button onClick={handleGenerate} disabled={!newTopic.trim()}>
            Generate
          </Button>
        </div>
      </section>
    </main>
  )
}
