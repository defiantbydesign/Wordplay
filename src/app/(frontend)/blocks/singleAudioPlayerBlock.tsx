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
      name: 'producerBio',
      label: "Producer's Bio",
      type: 'text',
      required: true,
    },
    {
      name: 'producerImage',
      label: "Producer's Image",
      type: 'upload',
      relationTo: 'media',
      required: true,
      mimetypes: ['image/*'],
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
