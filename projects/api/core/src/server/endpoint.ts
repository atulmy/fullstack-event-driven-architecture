// Imports
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken'

// Common imports
import { params } from '@packages/common/build/params.js'
import { User } from '@packages/model/build/user/model.js'

// Local imports
import { SECURITY_SECRET } from '../common/config/env.js'
import { router } from './rpc.js'

// modules
import { job } from '../modules/job/index.js'
import { user } from '../modules/user/index.js'

// router
const appRouter = router({
  job,
  user,
})

// types
export type AppRouter = typeof appRouter

// context
export const context = async ({ req }) => {
  const auth = {
    isAuthenticated: false,
    token: null,
    user: null,
    visitor: null,
  }

  try {
    const authorization = req.headers.authorization

    if (authorization) {
      const token: any = authorization.split(' ')

      if (token && token[1]) {
        const tokenData = jwt.verify(token[1], SECURITY_SECRET)

        if (tokenData) {
          // User
          const user: any = await User.findOne({
            _id: tokenData.id,
            isEnabled: true,
            isDeleted: false,
          }).lean()

          if (user) {
            auth.isAuthenticated = true
            auth.token = token[1]
            auth.user = user
          }
        }
      }
    }
  } catch (error) {
    console.error(error)
  }

  const ip = (req.headers['x-forwarded-for'] || 'Unknown') as string

  return {
    auth,
    ip,
  }
}

// endpoint
export function endpoint(app, httpServer) {
  console.info('SETUP - Endpoint..')

  app.use(
    params.common.endpoint.rpc,
    createExpressMiddleware({
      router: appRouter,
      createContext: context,
    })
  )

  const wss = new WebSocketServer({
    server: httpServer,
  })
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: context,
  })

  wss.on('connection', (ws) => {
    console.log(`+ Connection (${wss.clients.size})`)
    ws.once('close', () => {
      console.log(`- Connection (${wss.clients.size})`)
    })
  })

  process.on('SIGTERM', () => {
    console.log('SIGTERM')
    handler.broadcastReconnectNotification()
    wss.close()
  })
}
