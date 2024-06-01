// Local imports
import { router } from '../../server/rpc.js'
import { adminDetail } from './query/adminDetail.js'
import { list } from './query/list.js'
import { adminList } from './query/adminList.js'
import { adminSave } from './mutation/adminSave.js'

// router
export const blog = router({
  // query
  adminDetail,
  adminList,
  list,

  // mutation
  adminSave,
})
