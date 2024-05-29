// UI imports
import { toast } from '@packages/ui/build/toast'

// App imports
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
