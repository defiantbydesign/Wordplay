import { getPayload } from 'payload'
import config from '@/payload.config'
import { Metadata } from 'next'

import './styles.css'

import HeroBlock from './components/heroBlock'
import SingleAudioPlayer from './components/singleAudioPlayer'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Wordplay | Home',
    description:
      'Wordplay is the home of a once a month rap battle built to bring skill back to the hip hop community.',
  }
}

export default async function HomePage() {
  const {
    docs: [Page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
  })

  const renderBlock = (block: (typeof Page)['layout'][0]) => {
    switch (block.blockType) {
      case 'hero':
        return <HeroBlock block={block} key={block.id} />
      case 'singleAudioPlayer':
        return <SingleAudioPlayer block={block} key={block.id} />
      default:
        return null
    }
  }

  return <div className="pageContent">{Page.layout.map((block) => renderBlock(block))}</div>
}
