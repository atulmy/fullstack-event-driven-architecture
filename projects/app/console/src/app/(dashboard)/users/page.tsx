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
  const [users, setUsers] = useState([])

  // effect
  useEffect(() => {
    refresh()
  }, [])

  // refresh
  const refresh = async () => {
    isRefreshingToggle(true)

    try {
      // api
      const data = await api.user.adminList.query()

      if (data.success) {
        setUsers(data.data)
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
      <h5>Users</h5>

      {isRefreshing ? (
        <Loader />
      ) : users.length ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ width: '12rem' }}>Registered</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{params.user.roles[u.role].name}</td>
                <td>{day(u.createdAt).format(params.common.date.format.full)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  )
}

export default List
