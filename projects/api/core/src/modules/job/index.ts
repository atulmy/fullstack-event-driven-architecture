// Local imports
import { router } from '../../server/rpc.js'
import { adminList } from './query/adminList.js'
import { list } from './query/list.js'

// router
export const job = router({
  // query
  adminList,
  list,

  // mutation
})
