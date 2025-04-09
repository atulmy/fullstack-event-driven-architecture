'use client'

// Imports
import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import day from 'dayjs'

// UI imports
import { Loader } from '@packages/ui/loader/index'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/params'

// Local imports
import { URL_API_CORE, URL_API_TTS } from '@/common/config/env'
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

    try {
      Notification.requestPermission().then(() => {})
    } catch (error) {}

    // subscribe
    const connection = api.job.updates.subscribe(
      { token: auth.token },
      {
        onData: (job: any) => {
          console.log('job', job)

          setJobs((jobs) => [job, ...[...jobs].filter((t) => t._id !== job._id)])

          try {
            new Notification(params.site.name, {
              body: `${params.job.types[job.type].name} job is now ${params.job.status[job.status].name}.`,
            })
          } catch (error) {
            console.log('error', error)
          }
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
      <h5>Jobs</h5>

      {isRefreshing ? (
        <Loader />
      ) : jobs.length ? (
        <div className={style.list}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '9rem' }}>Type</th>
                <th style={{ width: '8rem' }}>Status</th>
                <th>Data</th>
                <th>Result</th>
                <th style={{ width: '13rem' }}>Created</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((j) => (
                <tr key={j._id}>
                  <td>{params.job.types[j.type].name}</td>
                  <td>{params.job.status[j.status].name}</td>
                  <td>
                    {j.type === params.job.types.tts.key && <p>{j.data.text}</p>}

                    {j.type === params.job.types.stt.key && (
                      <a href={`${URL_API_CORE}/${j.data.file}`} target='_blank'>
                        {j.data.file}
                      </a>
                    )}
                  </td>
                  <td>
                    {j.result && (
                      <>
                        {j.type === params.job.types.tts.key && (
                          <a href={`${URL_API_TTS}/${j.result.file}`} target='_blank'>
                            {j.result.file}
                          </a>
                        )}

                        {j.type === params.job.types.stt.key && <p>{j.result.text}</p>}
                      </>
                    )}
                  </td>
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
