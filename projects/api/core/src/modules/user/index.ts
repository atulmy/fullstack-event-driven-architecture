// Local imports
import { router } from '../../server/rpc'
import { adminAuthLogin } from './query/adminAuthLogin'
import { adminList } from './query/adminList'
import { authLogin } from './query/authLogin'
import { authSignup } from './mutation/authSignup'

// router
export const user = router({
  // query
  adminList,
  authLogin,

  // mutation
  adminAuthLogin,
  authSignup,
})
