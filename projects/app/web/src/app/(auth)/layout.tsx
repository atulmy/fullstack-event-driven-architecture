'use client'

// Imports
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import { IconRocket } from '@packages/ui/build/icons'
import style from './layout.module.scss'

// Local imports
import { userAuth } from '@/modules/user/state/auth'
import { routes } from '@/common/routes'
import { params } from '@packages/common/build/params'

// Component
const Layout = ({ children }) => {
  // router
  const router = useRouter()

  // state
  const { isAuthenticated } = useAtomValue(userAuth)

  // effect
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(routes.jobs.path)
    }
  }, [isAuthenticated])

  // render
  return (
    <div className={style.auth}>
      <div className={style.left}>
        {children}

        <em>
          By continuing, you agree to accept {params.site.name}'s terms & condition and privacy
          policy.
        </em>
      </div>

      <div className={style.right}>
        <IconRocket />

        <h4>{params.site.tagline}</h4>
        <h6>{params.site.description}</h6>
      </div>
    </div>
  )
}

export default Layout
