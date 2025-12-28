import { Metadata } from 'next'

import getUser from '@/app/(auth)/actions/getUser'
import makeUpperCase from '@/app/(frontend)/components/actions/makeUpperCase'

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const user = await getUser()
  const { userId } = await params
  const profileOwner = makeUpperCase(userId)
  return (
    <h1>
      This is {profileOwner}'s profile, and you are:
      {user ? ` Logged In As: ${user.username}` : 'Not Logged In'}
    </h1>
  )
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { userId } = await params
  const slugUserId = makeUpperCase(userId)
  return {
    title: `Wordplay - ${slugUserId}`,
    description: `Wordplay profile for ${slugUserId}. Wordplay is a competitive music platform where artist can prove their skills.`,
  }
}
