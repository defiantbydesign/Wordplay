/**
 * @fileoverview Hero block configuration for Payload CMS
 * @module HeroBlock
 */

import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'Hero',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
export default HeroBlock
