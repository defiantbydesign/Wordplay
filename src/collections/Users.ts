import { isAdmin } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  access: {
    admin: isAdmin,
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Judge',
          value: 'judge',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'username',
      type: 'text',
      label: 'Userame',
      required: true,
    },
    {
      name: 'fname',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      name: 'lname',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'group',
      interfaceName: 'Social Media Links',
      fields: [
        {
          name: 'spotifyLink',
          type: 'text',
          label: 'Spotify',
          admin: {
            description:
              'Go to Spotify, navigate to your profile, click the three dots "..." and then "Copy Link to Profile" and paste it here.',
          },
        },
        {
          name: 'instagramLink',
          type: 'text',
          label: 'Instagram',
          admin: {
            description: 'Include full URL, e.g. https://instagram.com/yourhandle',
          },
        },
        {
          name: 'tiktokLink',
          type: 'text',
          label: 'Tik Tok',
          admin: {
            description: 'Include full URL, e.g. https://tiktok.com/yourhandle',
          },
        },
      ],
    },
  ],
}
