'use client'

// Imports
import Link from 'next/link'

// UI imports
import { IconRocket } from '@packages/ui/icons/index'
import style from './error.module.scss'

// Local imports
import { routes } from '@/common/routes'

// Component
const NotFound = () => (
  <div className={style.error}>
    <IconRocket />
    <h1>🫣 Page not found</h1>
    <p>The page you are looking for does not exists.</p>
    <p>
      <Link href={routes.home.path}>Go to home page</Link>
    </p>
  </div>
)

export default NotFound
