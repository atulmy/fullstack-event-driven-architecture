// UI imports
import { toast } from '@packages/ui/build/toast'

// Local imports
import { ENV, URL_API_CORE } from '@/common/config/env'

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

// Upload file
export function upload(data) {
  return fetch(`${URL_API_CORE}/upload`, {
    method: 'POST',
    body: data,
  }).then((response) => response.json())
}
