'use client'

// Imports
import Link from 'next/link'

// UI imports
import { IconLogo } from '@packages/ui/build/icons'
import style from './error.module.scss'

// Component
const Error = () => (
  <div className={style.error}>
    <IconLogo />
    <h1>🫣 Something went wrong</h1>
    <p>There was some error and this page could not be loaded.</p>
    <p>
      <Link href={'/'}>Go to home page</Link>
    </p>
  </div>
)

export default Error
