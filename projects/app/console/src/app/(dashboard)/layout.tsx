'use client'

// Imports
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import style from './layout.module.scss'

// Local imports
import { userAuth } from '@/modules/user/state/auth'
import { Header } from '@/common/elements/header'
import { routes } from '@/common/routes'

// Component
const Layout = ({ children }) => {
  // router
  const router = useRouter()

  // state
  const { isAuthenticated } = useAtomValue(userAuth)

  // effect
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(routes.login.path)
    }
  }, [isAuthenticated])

  // render
  return (
    <>
      <Header />

      <main className={style.main}>{children}</main>
    </>
  )
}

export default Layout
