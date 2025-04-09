// Local imports
import { router } from '../../server/rpc'
import { adminDetail } from './query/adminDetail'
import { adminList } from './query/adminList'
import { detail } from './query/detail'
import { list } from './query/list'
import { adminSave } from './mutation/adminSave'

// router
export const blog = router({
  // query
  adminDetail,
  adminList,
  detail,
  list,

  // mutation
  adminSave,
})
