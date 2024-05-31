'use client'

// Imports
import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import day from 'dayjs'

// UI imports
import { Loader } from '@packages/ui/build/loader'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { api } from '@/common/config/api'
import { notify } from '@/common/helpers/utils'
import { userAuth } from '@/modules/user/state/auth'

// Component
const Jobs = () => {
  // state
  const auth = useAtomValue(userAuth)
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [jobs, setJobs] = useState([])

  // effect
  useEffect(() => {
    refresh()

    // subscribe
    const connection = api.job.updates.subscribe(
      { token: auth.token },
      {
        onData: (job: any) => {
          console.log('job', job)

          setJobs((jobs) => [job, ...[...jobs].filter((t) => t._id !== job._id)])
        },
      }
    )

    return () => {
      connection.unsubscribe()
    }
  }, [])

  // refresh
  const refresh = async () => {
    isRefreshingToggle(true)

    try {
      // api
      const data = await api.job.list.query()

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
    <div className={style.jobs}>
      <h2>Jobs</h2>

      {isRefreshing ? (
        <Loader />
      ) : jobs.length ? (
        <div className={style.list}>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th style={{ width: '14rem' }}>Created</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((j) => (
                <tr key={j._id}>
                  <td>{params.job.types[j.type].name}</td>
                  <td>{params.job.status[j.status].name}</td>
                  <td>{day(j.createdAt).format(params.common.date.format.display)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  )
}

export default Jobs
