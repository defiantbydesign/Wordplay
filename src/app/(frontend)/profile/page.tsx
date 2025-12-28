import { headers as getHeaders, headers } from 'next/headers.js'
import Image from 'next/image'
import { getPayload, Where } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import '../styles.css'

import { Metadata } from 'next'

import getUser from '@/app/(auth)/actions/getUser'

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUser()
  return {
    title: 'Wordplay' + (user ? ` - ${user.username}` : ''),
    description: 'Wordplay is a competitive music platform where artist can prove their skills.',
  }
}

export default async function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
  const user = await getUser()

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
