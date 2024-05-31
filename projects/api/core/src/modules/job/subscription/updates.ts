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
    console.log('input', input)

    const token = jwt.verify(input.token, SECURITY_SECRET)

    return observable((emit) => {
      eventEmitter.on(params.job.subscription.updates(token.id), emit.next)

      return () => {
        eventEmitter.off(params.job.subscription.updates(token.id), emit.next)
      }
    })
  })
