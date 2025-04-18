'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NavigationLink({ title, topic, parentId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate-child-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, parentId })
      })
      const data = await res.json()
      router.push(`/preview/${data.id}`)
    } catch (err) {
      console.error('NavigationLink error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} className="hover:underline text-blue-600">
      {loading ? 'Loading...' : title}
    </button>
  )
}