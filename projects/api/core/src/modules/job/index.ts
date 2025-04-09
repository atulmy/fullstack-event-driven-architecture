// Local imports
import { router } from '../../server/rpc'
import './event/index'
import { adminList } from './query/adminList'
import { list } from './query/list'
import { create } from './mutation/create'
import { updates } from './subscription/updates'

// router
export const job = router({
  // query
  adminList,
  list,

  // mutation
  create,

  // subscription
  updates,
})
