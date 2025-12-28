import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../../public/images/Logo.svg'
import getUser from '@/app/(auth)/actions/getUser'

export default async function NavBar() {
  const user = await getUser()

  const profileUrl = '/profile/' + user?.username
  return (
    <nav>
      <div className="nav containContent">
        <a href="/" className="navLogo">
          <Image src={logo.src} alt="" width={logo.width / 5} height={logo.height / 5} />
        </a>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/howItWorks">How It Works</Link>
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
              <Link href={profileUrl}>{user.username}</Link>
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
