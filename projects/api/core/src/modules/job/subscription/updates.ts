// Imports
// Imports
import { observable } from '@trpc/server/observable'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

// App imports
import { procedurePublic } from '../../../server/rpc.js'
import { SECURITY_SECRET } from '../../../common/config/env.js'
import { eventEmitter } from '../../../common/config/event.js'
import { params } from '@packages/common/build/params.js'

// procedure
export const updates = procedurePublic
  .input(
    z.object({
      token: z.string(),
    })
  )
  .subscription(async ({ input }) => {
    const token = jwt.verify(input.token, SECURITY_SECRET)

    return observable((emit) => {
      const event = params.job.subscription.updates(token.id)

      eventEmitter.on(event, emit.next)

      return () => {
        eventEmitter.off(event, emit.next)
      }
    })
  })
