// Imports
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/params'
import { Blog } from '@packages/model/blog/model'

// Local imports
import { procedureAdmin } from '../../../server/rpc'

// procedure
export const adminList = procedureAdmin
  .input(z.object({ page: z.number().optional() }).optional())
  .query(async ({ input }) => {
    try {
      // inputs
      const page = input ? input.page : 1

      const limit = params.common.pagination.default
      const skip = (parseInt(`${page}`, 10) - 1) * limit

      // Blog
      const data = await Blog.find({
        isDeleted: false,
      })
        .select(['_id', 'title', 'createdAt'])
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip)
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
