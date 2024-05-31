'use client'

// Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// UI imports
import { Loader } from '@packages/ui/build/loader'
import { IconArrowBack } from '@packages/ui/build/icons'
import style from './page.module.scss'

// App imports
import { api } from '@/common/config/api'
import { notify } from '@/common/helpers/utils'
import { routes } from '@/common/routes'

// Component
const Page = ({ params: { blogId } }) => {
  // router
  const router = useRouter()

  // state
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [isSubmitting, isSubmittingToggle] = useState(false)

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
        // @ts-ignore
        setPage(data.data)
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
    <div className={style.blog}>
      <h2>
        <Link href={routes.blog.path}>
          <IconArrowBack />
        </Link>{' '}
        Blog {blogId && blogId !== 'create' ? 'edit' : 'create'}
      </h2>

      <form onSubmit={onSubmit}>form</form>
    </div>
  )
}

export default Page
