import { headers as getHeaders, headers } from 'next/headers.js'
import Image from 'next/image'
import { getPayload, Where } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import '../styles.css'

import { Metadata } from 'next'

const pageHeaders = await getHeaders()
const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })
const { user } = await payload.auth({ headers: pageHeaders })

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Wordplay' + (user ? ` - ${user.username}` : ''),
    description: 'A simple CMS-powered word game built with Payload and Next.js',
  }
}

export default async function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  if (!user) {
    return (
      <main>
        <h1>Welcome to Wordplay!</h1>
      </main>
    )
  }

  return (
    <main>
      <h1>Welcome back, {user.username}!</h1>
    </main>
  )
}
