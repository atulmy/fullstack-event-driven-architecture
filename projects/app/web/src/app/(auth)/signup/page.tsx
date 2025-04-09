'use client'

// Imports
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// UI imports
import { IconCheck } from '@packages/ui/icons/index'

// Common imports
import { params } from '@packages/common/params'

// Local imports
import { api } from '@/common/config/api'
import { isDevelopment, notify } from '@/common/helpers/utils'
import { userAuth } from '@/modules/user/state/auth'
import { routes } from '@/common/routes'

// Component
const Signup = () => {
  // router
  const router = useRouter()

  // state
  const [{ isAuthenticated }, setAuth] = useAtom(userAuth)
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [user, setUser] = useState({
    name: isDevelopment() ? 'User' : '',
    email: isDevelopment() ? 'user@example.com' : '',
    password: isDevelopment() ? '123456' : '',
  })

  // effect
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(routes.jobs.path)
    }
  }, [isAuthenticated])

  // onSubmit
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      // api
      const data = await api.user.authSignup.mutate({
        name: user.name,
        email: user.email,
        password: user.password,
      })

      // notification
      notify({
        success: data.success,
        message: data.message,
      })

      if (data && data.success) {
        // redirect to login
        router.replace(routes.login.path)
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

  // on change
  const onChange = (event) => {
    setUser((user) => ({ ...user, [event.target.name]: event.target.value }))
  }

  // render
  return (
    <form onSubmit={onSubmit}>
      <h5>Signup</h5>

      <label>
        Name
        <input
          name='name'
          value={user.name}
          onChange={onChange}
          required
          placeholder='Enter name'
          maxLength={params.common.limits.name}
        />
      </label>

      <label>
        Email
        <input
          type='email'
          name='email'
          value={user.email}
          onChange={onChange}
          required
          placeholder='Enter your email'
          maxLength={params.common.limits.email}
          autoFocus
        />
      </label>

      <label>
        Password
        <input
          type='password'
          name='password'
          value={user.password}
          onChange={onChange}
          required
          placeholder='Enter password'
          maxLength={params.common.limits.password}
        />
      </label>

      <button type='submit' disabled={isSubmitting}>
        <IconCheck /> Submit
      </button>

      <p>
        Already have an account? <Link href={routes.login.path}>Click here</Link> to login.
      </p>
    </form>
  )
}

export default Signup
