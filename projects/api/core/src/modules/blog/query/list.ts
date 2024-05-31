// Imports
import { TRPCError } from '@trpc/server'

// Common imports
import { params } from '@packages/common/build/params.js'
import { Job } from '@packages/model/build/job/model.js'

// Local imports
import { procedureUser } from '../../../server/rpc.js'

// procedure
export const list = procedureUser.query(async ({ ctx }) => {
  try {
    // auth
    const { user } = ctx.auth

    // Job - latest 100
    const data = await Job.find({
      userId: user._id,
    })
      .select(['_id', 'type', 'status', 'data', 'result', 'createdAt'])
      .sort({ _id: -1 })
      .limit(100)
      .lean()

    return {
      data,
      success: true,
    }
  } catch (error) {
    console.log('error', error)

    throw new TRPCError({
      code: params.common.error.server as TRPCError['code'],
      message: error.message,
    })
  }
})
