// Imports
import { TRPCError } from '@trpc/server'

// Common imports
import { params } from '@packages/common/params'
import { Blog } from '@packages/model/blog/model'

// Local imports
import { procedurePublic } from '../../../server/rpc'

// procedure
export const list = procedurePublic.query(async () => {
  try {
    // Blog
    const data = await Blog.find({
      isDeleted: false,
    })
      .select(['_id', 'title', 'slug', 'content', 'createdAt'])
      .sort({ _id: -1 })
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
