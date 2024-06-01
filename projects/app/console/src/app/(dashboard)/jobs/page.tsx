'use client'

// Imports
import { useState, useEffect } from 'react'
import day from 'dayjs'

// UI imports
import { Loader } from '@packages/ui/build/loader'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { api } from '@/common/config/api'
import { notify } from '@/common/helpers/utils'

// Component
const List = () => {
  // state
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [jobs, setJobs] = useState([])

  // effect
  useEffect(() => {
    refresh()
  }, [])

  // refresh
  const refresh = async () => {
    isRefreshingToggle(true)

    try {
      // api
      const data = await api.job.adminList.query()

      if (data.success) {
        setJobs(data.data)
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
      <h5>Jobs</h5>

      {isRefreshing ? (
        <Loader />
      ) : jobs.length ? (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>User</th>
              <th style={{ width: '12rem' }}>Created</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((j) => (
              <tr key={j._id}>
                <td>{params.job.types[j.type].name}</td>
                <td>{params.job.status[j.status].name}</td>
                <td>{j.userId.name}</td>
                <td>{day(j.createdAt).format(params.common.date.format.full)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  )
}

export default List
