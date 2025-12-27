import React from 'react'
import './styles.css'
import NavBar from './components/navBar'

import { Work_Sans } from 'next/font/google'

const workSans = Work_Sans({ subsets: ['latin'], weight: ['100', '400', '600', '800'] })

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={workSans.className}>
        <NavBar />
        <main className="containContent">{children}</main>
      </body>
    </html>
  )
}
