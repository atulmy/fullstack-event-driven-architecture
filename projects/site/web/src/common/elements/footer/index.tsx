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
import { URL_APP_WEB } from '@/common/config/env'
import { Wrapper } from '@/common/elements/wrapper'
import { routes } from '@/common/routes'

// Component
export const Footer = () => (
  <footer className={style.footer}>
    <Wrapper>
      <div className={style.contents}>
        <nav>
          <Link href={routes.home.path} className={style.brand}>
            <IconRocket />
            {params.site.name}
          </Link>
          <em>{params.site.tagline}.</em>
          <em>&copy; 2024</em>
        </nav>

        <nav>
          <label>Product</label>
          <Link href={`${routes.home.path}#features`}>Features</Link>
          <Link href={routes.blog.path}>Blog</Link>
        </nav>

        <nav>
          <label>Get started</label>
          <Link href={URL_APP_WEB} target='_blank'>
            Login
          </Link>
          <Link href={`${URL_APP_WEB}/signup`} target='_blank'>
            Signup
          </Link>
        </nav>

        <nav>
          <label>Social</label>
          <a href='mailto:hello@example.com' target='_blank'>
            Email
          </a>
          <a href='https://facebook.com' target='_blank'>
            Facebook
          </a>
          <a href='https://instagram.com' target='_blank'>
            Instagram
          </a>
          <a href='https://x.com' target='_blank'>
            X (Twitter)
          </a>
        </nav>
      </div>
    </Wrapper>
  </footer>
)
