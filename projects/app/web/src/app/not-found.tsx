'use client'

// Imports
import Link from 'next/link'

// UI imports
import { IconLogo } from '@packages/ui/build/icons'
import style from './error.module.scss'

// Local imports
import { routes } from '@/common/routes'

// Component
const NotFound = () => (
  <div className={style.error}>
    <IconLogo />
    <h1>🫣 Page not found</h1>
    <p>The page you are looking for does not exists.</p>
    <p>
      <Link href={'/'}>Go to home page</Link>
    </p>
  </div>
)

export default NotFound
