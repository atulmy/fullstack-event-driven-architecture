'use client'

// Imports
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

// UI imports
import { IconCheck } from '@packages/ui/build/icons'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { api } from '@/common/config/api'
import { notify, upload } from '@/common/helpers/utils'
import { routes } from '@/common/routes'

// Component
const SpeechToText = () => {
  // router
  const router = useRouter()

  // state
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [file, setFile] = useState(null)

  // refs
  const fileRef = useRef(null)

  // onSubmit
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      // Upload file
      const uploaded = await upload(file)

      // api
      const data = await api.job.create.mutate({
        type: params.job.types.stt.key,
        data: { file: uploaded.data },
      })

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

  // on change file
  const onChangeFile = (event) => {
    if (event.target.files[0].size < 1024 * 1024 * params.common.limits.file) {
      const file = new FormData()
      file.append('file', event.target.files[0])
      setFile(file)
    } else {
      notify({
        success: false,
        message: `Please upload file less than ${params.common.limits.file}MB in size.`,
      })
    }
  }

  // render
  return (
    <div className={style.tts}>
      <h2>Speech to Text</h2>

      <form onSubmit={onSubmit}>
        <label>
          File (mp3)
          <input type='file' onChange={onChangeFile} required accept='.mp3' ref={fileRef} />
          <em>File size limit: {params.common.limits.file} MB</em>
        </label>

        <div>
          <button type='submit' disabled={isSubmitting}>
            <IconCheck /> Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default SpeechToText
