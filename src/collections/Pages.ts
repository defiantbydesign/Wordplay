import type { CollectionConfig } from 'payload'
import HeroBlock from '@/app/(frontend)/blocks/heroBlock'
import singleAudioPlayer from '@/app/(frontend)/blocks/singleAudioPlayerBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [HeroBlock, singleAudioPlayer],
    },
  ],
}
