'use client'

// Imports
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import { Alert } from '@packages/ui/build/alert'
import { IconLogo } from '@packages/ui/build/icons'
import style from './style.module.scss'

// App imports
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

    router.push(routes.auth.path)
  }

  // render
  return (
    isClient && (
      <header className={style.header}>
        <nav className={style.left}>
          <Link
            href={isAuthenticated ? routes.users.path : routes.auth.path}
            className={style.brand}
          >
            <IconLogo />
            Console
          </Link>

          {isAuthenticated && (
            <>
              <Link href={routes.users.path}>Users</Link>
              <Link href={routes.blog.path}>Blog</Link>
            </>
          )}
        </nav>

        {isAuthenticated && (
          <nav className={style.right}>
            <Alert
              trigger={<a href='#'>Logout</a>}
              description='Are you sure you want to logout?'
              action='Yes'
              onAction={onLogout}
            />
          </nav>
        )}
      </header>
    )
  )
}
