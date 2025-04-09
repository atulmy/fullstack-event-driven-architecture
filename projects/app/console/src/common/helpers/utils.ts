// UI imports
import { toast } from '@packages/ui/toast/index'

// Local imports
import { ENV } from '@/common/config/env'

// Check development env
export function isDevelopment() {
  // return false
  return ENV === 'development'
}

// notify
export function notify({
  success = false,
  message = 'There was some error, please try again.',
  autoClose = 0,
}) {
  toast(message, {
    autoClose: autoClose > 0 ? autoClose : success ? 3500 : 10000,
  })
}

// auth header
export function authHeader() {
  try {
    const data = window.localStorage.getItem('userAuth')

    if (data) {
      const user = JSON.parse(data)
      if (user.token) {
        return {
          authorization: `Bearer ${user.token}`,
        }
      }
    }
  } catch (error) {
    console.log('error authHeader', error)
  }

  return {}
}
