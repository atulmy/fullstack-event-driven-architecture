'use client'

// UI imports
import {
  IconArrowForward,
  IconSpeechToText,
  IconTextToSpeech,
  IconTrackChanges,
} from '@packages/ui/build/icons'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { URL_APP_WEB } from '@/common/config/env'
import { Wrapper } from '@/common/elements/wrapper'

// Component
const Home = () => (
  <div className={style.home}>
    {/* hero */}
    <Wrapper className={style.hero}>
      <h1>{params.site.tagline}</h1>
      <h2>{params.site.description}</h2>

      <a href={URL_APP_WEB} target='_blank'>
        <button className='large'>
          Get started <IconArrowForward />
        </button>
      </a>
    </Wrapper>

    {/* benefits */}
    <Wrapper className={style.benefits} id='benefits'>
      <div className={style.item}>
        <h3>Monorepo</h3>
        <p>
          Consolidate multiple projects into a single repository, facilitating unified version
          control, shared dependencies, and consistent development workflows.
        </p>
      </div>

      <div className={style.item}>
        <h3>Event driven</h3>
        <p>
          Decouple components by using events to trigger and communicate between services, enabling
          asynchronous and scalable interactions.
        </p>
      </div>

      <div className={style.item}>
        <h3>Scalable</h3>
        <p>
          Efficiently handle increased loads by adding resources or optimizing performance without
          compromising system stability.
        </p>
      </div>
    </Wrapper>

    {/* features */}
    <Wrapper className={style.features} id='features'>
      <h2>Features</h2>

      <div className={style.list}>
        <div className={style.item}>
          <aside>
            <h3>Text to Speech</h3>
            <p>
              The text-to-speech feature converts written text into spoken audio, enhancing
              accessibility and user interaction.
            </p>
          </aside>

          <figure>
            <IconTextToSpeech />
          </figure>
        </div>

        <div className={style.item}>
          <aside>
            <h3>Speech to Text</h3>
            <p>
              The speech-to-text feature transcribes spoken language into written text, enabling
              voice-based input and interaction.
            </p>
          </aside>

          <figure>
            <IconSpeechToText />
          </figure>
        </div>

        <div className={style.item}>
          <aside>
            <h3>Jobs</h3>
            <p>
              Real-time tracking of jobs provides instant updates on job status and progress,
              ensuring timely monitoring and management.
            </p>
          </aside>

          <figure>
            <IconTrackChanges />
          </figure>
        </div>
      </div>
    </Wrapper>
  </div>
)

export default Home
