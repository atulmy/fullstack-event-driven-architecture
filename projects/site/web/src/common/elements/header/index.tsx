'use client'

// Imports
import React from 'react'
import Link from 'next/link'

// UI imports
import { IconRocket } from '@packages/ui/build/icons'
import style from './style.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { routes } from '@/common/routes'

// Component
export const Header = () => (
  <header className={style.header}>
    <nav className={style.left}>
      <Link href={routes.home.path} className={style.brand}>
        <IconRocket />
        {params.site.name}
      </Link>

      <Link href={routes.features.path}>Features</Link>
    </nav>

    <nav className={style.right}>
      <Link href={routes.features.path}>Features</Link>
    </nav>
  </header>
)
