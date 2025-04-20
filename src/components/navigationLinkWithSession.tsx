'use client'

import { useEffect, useState } from 'react'
import NavigationLink from './navigationLink'

export default function NavigationLinkWithSession(props: { title: string; topic: string; parentId: string }) {
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    let id = localStorage.getItem('sessionId')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('sessionId', id)
    }
    setSessionId(id)
  }, [])

  if (!sessionId) return null

  return <NavigationLink {...props} sessionId={sessionId} />
}
