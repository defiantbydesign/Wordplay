import { headers as getHeaders, headers } from 'next/headers.js'
import Image from 'next/image'
import { getPayload, Payload, Where } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import { Metadata } from 'next'
import HeroBlock from './components/heroBlock'
import SingleAudioPlayer from './components/singleAudioPlayer'

const pageHeaders = await getHeaders()
const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })
const { user } = await payload.auth({ headers: pageHeaders })

export async function generateMetadata(): Promise<Metadata> {
  return {
    // title: 'Wordplay | ' + (user ? `${user.username}` : ''),
    title: 'Wordplay | Home',
    description:
      'Wordplay is the home of a once a month rap battle built to bring skill back to the hip hop community.',
  }
}

export default async function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const {
    docs: [Page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
  })

  const renderBlock = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case 'hero':
        return <HeroBlock block={block} key={block.id} />
      case 'singleAudioPlayer':
        return <SingleAudioPlayer block={block} key={block.id} />
      default:
        return null
    }
  }

  return <div>{Page.layout.map((block) => renderBlock(block))}</div>
}
