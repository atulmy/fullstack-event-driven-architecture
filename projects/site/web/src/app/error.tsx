'use client'

// Imports
import Link from 'next/link'

// UI imports
import { IconRocket } from '@packages/ui/icons/index'
import style from './error.module.scss'

// Local imports
import { routes } from '@/common/routes'

// Component
const Error = () => (
  <div className={style.error}>
    <IconRocket />
    <h1>🫣 Something went wrong</h1>
    <p>There was some error and this page could not be loaded.</p>
    <p>
      <Link href={routes.home.path}>Go to home page</Link>
    </p>
  </div>
)

export default Error
