'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Payload } from 'payload'
import { User } from '@/payload-types'

export default async function getUser(): Promise<User | null> {
  const pageHeaders = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers: pageHeaders })
  return user || null
}
