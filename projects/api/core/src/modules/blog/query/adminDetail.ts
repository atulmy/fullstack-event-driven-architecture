// Imports
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/params'
import { Blog } from '@packages/model/blog/model'

// Local imports
import { procedureAdmin } from '../../../server/rpc'

// procedure
export const adminDetail = procedureAdmin
  .input(z.object({ blogId: z.string() }))
  .query(async ({ input }) => {
    try {
      // inputs
      const blogId = input.blogId.trim()

      if (blogId) {
        // Blog
        const data = await Blog.findOne({
          _id: blogId,
          isDeleted: false,
        }).lean()

        return {
          data,
          success: true,
        }
      }
    } catch (error) {
      console.log('error', error)

      throw new TRPCError({
        code: params.common.error.server as TRPCError['code'],
        message: error.message,
      })
    }

    return {
      success: false,
      message: 'Please try again.',
    }
  })
