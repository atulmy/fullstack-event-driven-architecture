'use client'

// Imports
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import { Alert } from '@packages/ui/build/alert'
import { IconRocket } from '@packages/ui/build/icons'
import style from './style.module.scss'

// Local imports
import { userAuth, initial } from '@/modules/user/state/auth'
import { routes } from '@/common/routes'
import { params } from '@packages/common/build/params'

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
            href={isAuthenticated ? routes.jobs.path : routes.login.path}
            className={style.brand}
          >
            <IconRocket />
            {params.site.name}
          </Link>

          {isAuthenticated ? (
            <>
              <Link href={routes.jobs.path}>Jobs</Link>
              <Link href={routes.stt.path}>Speech to Text</Link>
              <Link href={routes.tts.path}>Text to Speech</Link>
            </>
          ) : (
            <>
              <Link href={routes.login.path}>Login</Link>
              <Link href={routes.signup.path}>Signup</Link>
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
