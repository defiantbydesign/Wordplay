import { Page } from '@/payload-types'
import { headers as getHeaders } from 'next/headers.js'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'

import { Oswald, Staatliches } from 'next/font/google'

const headerFont = Oswald({ subsets: ['latin'], weight: ['200', '400', '700'] })
const accentFont = Staatliches({ subsets: ['latin'], weight: ['400'] })

const pageHeaders = await getHeaders()
const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })
const { user } = await payload.auth({ headers: pageHeaders })

type HeroBlockProps = {
  block: Page['layout'][0]
}

export default function HeroBlock({ block }: { block: HeroBlockProps }) {
  return (
    <section className="hero">
      <h1 className={accentFont.className}>{block.heading}</h1>
      <h3>{block.subheading}</h3>
      {typeof block?.image === 'object' && block.image?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={block.image.url}
          alt={block.image.alt || 'Hero Image'}
          width={block.image.width}
          height={block.image.height}
        />
      )}
    </section>
  )
}
