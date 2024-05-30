// Local imports
import { router } from '../../server/rpc.js'
import { adminList } from './query/adminList.js'
import { list } from './query/list.js'
import { create } from './mutation/create.js'

// router
export const job = router({
  // query
  adminList,
  list,

  // mutation
  create,
})
