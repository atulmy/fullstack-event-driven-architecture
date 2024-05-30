// Imports
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/build/params.js'
import { Job } from '@packages/model/build/job/model.js'

// Local imports
import { procedureUser } from '../../../server/rpc.js'
import { eventEmitter } from '../../../common/config/event.js'
import { redisPub } from '../../../server/redis.js'

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
        await redisPub.publish(
          params.job.types.stt.channels.start,
          JSON.stringify({
            jobId: job._id,
          })
        )

        // websocket
        eventEmitter.emit(`job.create.${user._id}`, job.toJSON())

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
