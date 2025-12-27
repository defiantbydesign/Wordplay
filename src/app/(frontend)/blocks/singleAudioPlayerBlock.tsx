/**
 * @fileoverview Hero block configuration for Payload CMS
 * @module HeroBlock
 */

import { Block } from 'payload'

export const SingleAudioPlayerBlock: Block = {
  slug: 'singleAudioPlayer',
  interfaceName: 'SingleAudioPlayer',
  fields: [
    {
      name: 'producerName',
      label: 'Producer',
      type: 'text',
      required: true,
    },
    {
      name: 'trackName',
      label: 'Track Name',
      type: 'text',
      required: true,
    },
    {
      name: 'audioFile',
      label: 'Audio File',
      type: 'upload',
      relationTo: 'media',
      required: true,
      mimetypes: ['audio/*'],
    },
  ],
}
export default SingleAudioPlayerBlock
