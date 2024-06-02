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
import { CallToAction } from '@/common/elements/cta'

// Component
const Home = () => (
  <div className={style.home}>
    {/* hero */}
    <Wrapper className={style.hero}>
      <h1>{params.site.tagline}</h1>
      <h6>{params.site.description}</h6>

      <a href={URL_APP_WEB} target='_blank'>
        <button className='large'>
          Get started <IconArrowForward />
        </button>
      </a>
    </Wrapper>

    {/* benefits */}
    <Wrapper className={style.benefits} id='benefits'>
      <div className={style.item}>
        <h5>Enhanced accessibility</h5>
        <p>
          Facilitates communication for individuals with disabilities, making digital content
          accessible to all.
        </p>
      </div>

      <div className={style.item}>
        <h5>Increased productivity</h5>
        <p>
          Allows users to multitask by converting spoken words to text and vice versa, saving time
          and effort.
        </p>
      </div>

      <div className={style.item}>
        <h5>Improved accuracy</h5>
        <p>
          Utilizes advanced algorithms to ensure high accuracy in transcriptions and
          natural-sounding speech synthesis.
        </p>
      </div>
    </Wrapper>

    {/* features */}
    <Wrapper className={style.features} id='features'>
      <h2>Features</h2>

      <div className={style.list}>
        <div className={style.item}>
          <aside>
            <h3>Text-to-Speech</h3>
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
            <h3>Speech-to-Text</h3>
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
            <h3>Tracking</h3>
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

    {/* call to action */}
    <CallToAction />
  </div>
)

export default Home
