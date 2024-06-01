'use client'

// Imports
import React from 'react'
import Link from 'next/link'

// UI imports
import { IconRocket, IconArrowForward } from '@packages/ui/build/icons'
import style from './style.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { URL_APP_WEB } from '@/common/config/env'
import { Wrapper } from '@/common/elements/wrapper'
import { routes } from '@/common/routes'

// Component
export const Header = () => (
  <header className={style.header}>
    <Wrapper>
      <nav className={style.left}>
        <Link href={routes.home.path} className={style.brand}>
          <IconRocket />
          {params.site.name}
        </Link>

        <Link href={`${routes.home.path}#features`}>Features</Link>
        <Link href={routes.blog.path}>Blog</Link>
      </nav>

      <nav className={style.right}>
        <Link href={URL_APP_WEB} target='_blank'>
          Login
        </Link>

        <Link href={`${URL_APP_WEB}/signup`} target='_blank'>
          Signup <IconArrowForward />
        </Link>
      </nav>
    </Wrapper>
  </header>
)
