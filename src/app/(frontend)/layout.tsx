import React from 'react'
import './styles.css'
import NavBar from './components/navBar'

import { Work_Sans } from 'next/font/google'
import '../../public/myStyles.css'

const workSans = Work_Sans({ subsets: ['latin'], weight: ['100', '400', '600', '800'] })

export const metadata = {
  description:
    'Wordplay is a competitive music platform where users can put their skills to the test, and prove what they can do.',
  title: 'Wordplay',
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
