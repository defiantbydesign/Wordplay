import { Page } from '@/payload-types'

type HeroBlockProps = {
  block: Page['layout'][0]
}

export default function HeroBlock({ block }: { block: HeroBlockProps }) {
  return (
    <section className="hero">
      <h1>{block.heading}</h1>
      <h4>{block.subheading}</h4>
      {typeof block?.image === 'object' && block.image?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={block.image.url} alt={block.image.alt || 'Hero Image'} />
      )}
    </section>
  )
}
