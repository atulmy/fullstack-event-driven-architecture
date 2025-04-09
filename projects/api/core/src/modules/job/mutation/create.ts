// Imports
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/params'
import { Job } from '@packages/model/job/model'

// Local imports
import { procedureUser } from '../../../server/rpc'
import { eventEmitter } from '../../../common/config/event'
import { publisher } from '../../../server/redis'

// procedure
export const create = procedureUser
  .input(
    z.object({
      type: z.string(),
      data: z.any(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    try {
      // auth
      const { user } = ctx.auth

      // inputs
      const type = input.type
      const data = input.data

      // Job - create
      const job = await Job.create({
        userId: user._id,
        type,
        status: params.job.status.processing.key,
        data,
      })

      if (job) {
        // redis - publish
        await publisher.publish(
          params.job.types[type].channels.start,
          JSON.stringify({
            jobId: job._id,
            data,
          })
        )

        // websocket
        eventEmitter.emit(`job.${user._id}`, job.toJSON())

        return {
          data: job,
          success: true,
          message: `${params.job.types[type].name} job has been created successfully.`,
        }
      }

      return {
        success: false,
        message: 'Please try again.',
      }
    } catch (error) {
      console.log(error)

      throw new TRPCError({
        code: params.common.error.server as TRPCError['code'],
        message: error.message,
      })
    }
  })
