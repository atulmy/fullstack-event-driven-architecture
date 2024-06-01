// Local imports
import { router } from '../../server/rpc.js'
import { adminList } from './query/adminList.js'
import { adminSave } from './mutation/adminSave.js'

// router
export const blog = router({
  // query
  adminList,

  // mutation
  adminSave,
})
