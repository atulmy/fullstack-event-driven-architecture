'use client'

// Imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// UI imports
import { IconCheck } from '@packages/ui/build/icons'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { api } from '@/common/config/api'
import { isDevelopment, notify } from '@/common/helpers/utils'
import { routes } from '@/common/routes'

// Component
const TextToSpeech = () => {
  // router
  const router = useRouter()

  // state
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [text, setText] = useState(isDevelopment() ? 'Hello world, how are you?' : '')

  // onSubmit
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      // api
      const data = await api.job.create.mutate({ type: params.job.types.tts.key, data: { text } })

      // notification
      notify({
        success: data.success,
        message: data.message,
      })

      if (data && data.success) {
        router.push(routes.jobs.path)
      }
    } catch (error) {
      console.log(error)

      // notification
      notify({
        success: false,
        message: error.message,
      })
    } finally {
      isSubmittingToggle(false)
    }
  }

  // render
  return (
    <div className={style.tts}>
      <h2>Text to Speech</h2>

      <form onSubmit={onSubmit}>
        <label>
          Text
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
            placeholder='Enter the text to convert to speech'
            maxLength={params.common.limits.text}
            autoFocus
            rows={5}
          ></textarea>
          <em>
            {text.length}/{params.common.limits.text}
          </em>
        </label>

        <button type='submit' disabled={isSubmitting}>
          <IconCheck /> Submit
        </button>
      </form>
    </div>
  )
}

export default TextToSpeech
