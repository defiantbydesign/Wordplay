import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
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
    <nav>
      <div className="nav containContent">
        <a href="/" className="navLogo">
          <img src={logo.src} alt="" width={logo.width / 5} height={logo.height / 5} />
        </a>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/submit">Submit</Link>
          </li>
          <li>
            <Link href="/listen">Listen</Link>
          </li>
        </ul>
        <div className="navCTA">
          {user ? (
            <div className="navProfileLink">
              <Link href="/profile">{user.username}</Link>
            </div>
          ) : (
            <div className="navLogin">
              <Link href="/login">Login</Link>
              <Link href="/signUp" className="CTABtn">
                Get Started - Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
