'use client'

// Imports
import React from 'react'

// UI imports
import { IconArrowForward } from '@packages/ui/icons/index'
import style from './style.module.scss'

// Common imports
import { params } from '@packages/common/params'

// Local imports
import { URL_APP_WEB } from '@/common/config/env'
import { Wrapper } from '@/common/elements/wrapper'
import { routes } from '@/common/routes'

// Component
export const CallToAction = () => (
  <div className={style.cta}>
    <Wrapper>
      <div className={style.contents}>
        <h3>Start creating Text-to-Speech and Speech-to-Text with ease</h3>

        <a href={URL_APP_WEB} target='_blank'>
          <button className='large'>
            Get started <IconArrowForward />
          </button>
        </a>
      </div>
    </Wrapper>
  </div>
)
