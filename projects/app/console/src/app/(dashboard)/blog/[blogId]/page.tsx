'use client'

// Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// UI imports
import { Loader } from '@packages/ui/build/loader'
import { IconArrowBack, IconCheck } from '@packages/ui/build/icons'
import style from './page.module.scss'

// Local imports
import { api } from '@/common/config/api'
import { isDevelopment, notify } from '@/common/helpers/utils'
import { routes } from '@/common/routes'

// Component
const Save = ({ params: { blogId } }) => {
  // router
  const router = useRouter()

  // state
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [blog, setBlog] = useState({
    title: isDevelopment() ? 'The Future of Text-to-Speech and Speech-to-Text Technology' : '',
    content: isDevelopment()
      ? `Discover Speechy, an innovative app that transforms communication with its seamless text-to-speech and speech-to-text capabilities. Built on a robust, scalable architecture using Node.js, React, Redis, MongoDB, and Docker, Speechy sets a new standard in accessibility and productivity.`
      : '',
  })

  // effect
  useEffect(() => {
    if (blogId && blogId !== 'create') {
      refresh(blogId)
    }
  }, [blogId])

  // refresh
  const refresh = async (blogId) => {
    isRefreshingToggle(true)

    try {
      // api
      const data = await api.blog.adminDetail.query({ blogId })

      if (data.success) {
        setBlog(data.data)
      } else {
        // notification
        notify({
          success: false,
          message: data.message,
        })
      }
    } catch (error) {
      // notification
      notify({
        success: false,
        message: error.message,
      })
    } finally {
      isRefreshingToggle(false)
    }
  }

  // on submit
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      // api
      const data = await api.blog.adminSave.mutate(blog)

      isSubmittingToggle(false)

      // notification
      notify({
        success: data.success,
        message: data.message,
      })

      if (data && data.success) {
        router.push(routes.blog.path)
      }
    } catch (error) {
      console.log(error)

      isSubmittingToggle(false)

      // notification
      notify({
        success: false,
        message: error.message,
      })
    }
  }

  // on change
  const onChange = (event) => {
    setBlog((blog) => ({ ...blog, [event.target.name]: event.target.value }))
  }

  // render
  return (
    <div className={style.save}>
      <h5>
        <Link href={routes.blog.path}>
          <IconArrowBack />
        </Link>
        Blog {blogId && blogId !== 'create' ? 'edit' : 'create'}
      </h5>

      {isRefreshing ? (
        <Loader />
      ) : (
        <form onSubmit={onSubmit}>
          <label>
            Title
            <input
              name='title'
              value={blog.title}
              onChange={onChange}
              required
              placeholder='Enter title'
              autoFocus
            />
          </label>

          <label>
            Content
            <textarea
              name='content'
              value={blog.content}
              onChange={onChange}
              required
              placeholder='Enter content'
              rows={7}
            ></textarea>
          </label>

          <button type='submit' disabled={isSubmitting}>
            <IconCheck /> Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default Save
