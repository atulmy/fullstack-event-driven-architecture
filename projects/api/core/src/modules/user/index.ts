// Local imports
import { router } from '../../server/rpc.js'
import { adminAuthLogin } from './query/adminAuthLogin.js'
import { adminList } from './query/adminList.js'
import { authLogin } from './query/authLogin.js'
import { authSignup } from './mutation/authSignup.js'

// router
export const user = router({
  // query
  adminList,
  authLogin,

  // mutation
  adminAuthLogin,
  authSignup,
})
