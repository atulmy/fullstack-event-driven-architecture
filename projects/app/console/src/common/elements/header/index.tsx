'use client'

// Imports
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

// Common imports
import { params } from '@packages/common/params'

// UI imports
import { Alert } from '@packages/ui/alert/index'
import { IconRocket } from '@packages/ui/icons/index'
import style from './style.module.scss'

// Local imports
import { userAuth, initial } from '@/modules/user/state/auth'
import { routes } from '@/common/routes'

// Component
export const Header = () => {
  // router
  const router = useRouter()

  // state
  const [{ isAuthenticated }, setAuth] = useAtom(userAuth)
  const [isClient, isClientToggle] = useState(false)

  // effect
  useEffect(() => {
    isClientToggle(true)
  }, [])

  // onLogout
  const onLogout = async () => {
    setAuth(initial)

    router.push(routes.login.path)
  }

  // render
  return (
    isClient && (
      <header className={style.header}>
        <nav className={style.left}>
          <Link
            href={isAuthenticated ? routes.users.path : routes.login.path}
            className={style.brand}
          >
            <IconRocket />
            {params.site.name} Console
          </Link>

          <Link href={routes.users.path}>Users</Link>

          <Link href={routes.jobs.path}>Jobs</Link>

          <Link href={routes.blog.path}>Blog</Link>
        </nav>

        <nav className={style.right}>
          <Alert
            trigger={<a>Logout</a>}
            description='Are you sure you want to logout?'
            action='Yes'
            onAction={onLogout}
          />
        </nav>
      </header>
    )
  )
}
