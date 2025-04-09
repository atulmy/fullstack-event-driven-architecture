'use client'

// Imports
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import { IconRocket } from '@packages/ui/icons/index'
import style from './layout.module.scss'

// Local imports
import { userAuth } from '@/modules/user/state/auth'
import { routes } from '@/common/routes'
import { params } from '@packages/common/params'

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
      {/* left */}
      <div className={style.left}>
        {children}

        <em>
          By continuing, you agree to accept {params.site.name}'s terms & condition and privacy
          policy.
        </em>
      </div>

      {/* right */}
      <div className={style.right}>
        {/* intro */}
        <div className={style.intro}>
          <IconRocket />

          <h4>{params.site.tagline}</h4>
          <h6>{params.site.description}</h6>
        </div>

        {/* testimonials */}
        <div className={style.testimonials}>
          <blockquote>
            <p>
              "I love using this app for my daily tasks. The speech-to-text accuracy is phenomenal.
              Highly recommend for anyone looking to boost productivity!"
            </p>
            <footer>— Jenny S.</footer>
          </blockquote>

          <blockquote>
            <p>
              "The text-to-speech functionality is incredibly clear, and it makes accessing digital
              content so much easier."
            </p>
            <footer>— Alex T.</footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default Layout
