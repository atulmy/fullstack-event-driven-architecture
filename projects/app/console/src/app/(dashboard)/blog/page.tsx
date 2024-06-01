'use client'

// Imports
import { useState, useEffect } from 'react'
import Link from 'next/link'
import day from 'dayjs'

// UI imports
import { Loader } from '@packages/ui/build/loader'
import { IconAdd } from '@packages/ui/build/icons'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { api } from '@/common/config/api'
import { notify } from '@/common/helpers/utils'
import { routes } from '@/common/routes'

// Component
const List = () => {
  // state
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [blog, setBlog] = useState([])

  // effect
  useEffect(() => {
    refresh()
  }, [])

  // refresh
  const refresh = async () => {
    isRefreshingToggle(true)

    try {
      // api
      const data = await api.blog.adminList.query()

      if (data.success) {
        setBlog(data.data)
      } else {
        // notification
        notify({
          success: false,
          message: 'Please try again.',
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

  // render
  return (
    <div className={style.list}>
      <h2>
        Blog
        <Link href={routes.blog.save.path()}>
          <IconAdd />
        </Link>
      </h2>

      {isRefreshing ? (
        <Loader />
      ) : blog.length ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th style={{ width: '12rem' }}>Created</th>
              <th style={{ width: '12rem' }}>Updated</th>
            </tr>
          </thead>

          <tbody>
            {blog.map((b) => (
              <tr key={b._id}>
                <td>
                  <Link href={routes.blog.save.path(b._id)}>{b.title}</Link>
                </td>
                <td>{day(b.createdAt).format(params.common.date.format.full)}</td>
                <td>{day(b.updatedAt).format(params.common.date.format.full)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          No blog found. <Link href={routes.blog.save.path()}>Create</Link> a new blog.
        </p>
      )}
    </div>
  )
}

export default List
