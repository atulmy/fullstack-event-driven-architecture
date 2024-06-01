// Imports
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/build/params.js'
import { slugify } from '@packages/common/build/utils.js'
import { Blog } from '@packages/model/build/blog/model.js'

// Local imports
import { procedureAdmin } from '../../../server/rpc.js'

// procedure
export const adminSave = procedureAdmin
  .input(
    z.object({
      _id: z.string().optional(),
      title: z.string(),
      content: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      // inputs
      const _id = input._id
      const title = input.title.trim()
      const content = input.content.trim()

      const fields = {
        title,
        content,
      }

      let data

      if (_id) {
        // Blog - update
        data = await Blog.updateOne({ _id }, { $set: fields })
      } else {
        // Blog - create
        data = await Blog.create({ ...fields, slug: slugify(title) })
      }

      return {
        data,
        success: true,
        message: 'Blog has been saved successfully.',
      }
    } catch (error) {
      console.log('error', error)

      throw new TRPCError({
        code: params.common.error.server as TRPCError['code'],
        message: error.message,
      })
    }
  })
