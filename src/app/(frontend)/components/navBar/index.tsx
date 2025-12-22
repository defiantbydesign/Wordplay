import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import logo from '../../../../public/images/Logo.svg'

export default async function NavBar() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <nav className="nav">
      <a href="/" className="navLogo">
        <img src={logo.src} alt="" width={logo.width / 5} height={logo.height / 5} />
      </a>
      <ul>
        <li>
          <a href="/submit">Submit</a>
        </li>
        <li>
          <a href="/listen">Listen</a>
        </li>
        {user ? (
          <li>
            <a href="/profile">Profile</a>
          </li>
        ) : (
          <li>
            <a href="/login">Login or Sign Up</a>
          </li>
        )}
      </ul>
    </nav>
  )
}
