// Imports
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/params'
import { Blog } from '@packages/model/blog/model'

// Local imports
import { procedurePublic } from '../../../server/rpc'

// procedure
export const detail = procedurePublic
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }) => {
    try {
      // inputs
      const slug = input.slug.trim()

      if (slug) {
        // Blog
        const data = await Blog.findOne({
          slug,
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
