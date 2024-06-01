'use client'

// UI imports
import { IconArrowForward } from '@packages/ui/build/icons'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { URL_APP_WEB } from '@/common/config/env'
import { Wrapper } from '@/common/elements/wrapper'

// Component
const Home = () => {
  // render
  return (
    <div className={style.home}>
      <Wrapper className={style.hero}>
        <h1>{params.site.tagline}</h1>
        <h2>{params.site.description}</h2>

        <a href={URL_APP_WEB} target='_blank'>
          <button>
            Get started <IconArrowForward />
          </button>
        </a>
      </Wrapper>

      <Wrapper className={style.features}>
        <div className={style.item}>
          <h2>Monorepo</h2>
          <p>
            Consolidate multiple projects into a single repository, facilitating unified version
            control, shared dependencies, and consistent development workflows.
          </p>
        </div>

        <div className={style.item}>
          <h2>Event driven</h2>
          <p>
            Decouple components by using events to trigger and communicate between services,
            enabling asynchronous and scalable interactions.
          </p>
        </div>

        <div className={style.item}>
          <h2>Scalable</h2>
          <p>
            Efficiently handle increased loads by adding resources or optimizing performance without
            compromising system stability.
          </p>
        </div>
      </Wrapper>
    </div>
  )
}

export default Home
