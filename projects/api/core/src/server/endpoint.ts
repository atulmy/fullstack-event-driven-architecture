// Imports
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { WebSocketServer } from 'ws'

// Common imports
import { params } from '@packages/common/build/params.js'

// Local imports
import { router } from './rpc.js'

// modules
import { user } from '../modules/user/index.js'

// router
const appRouter = router({
  user,
})

// types
export type AppRouter = typeof appRouter

// endpoint
export function endpoint(app, httpServer) {
  console.info('SETUP - Endpoint..')

  app.use(
    params.common.endpoint.rpc,
    createExpressMiddleware({
      router: appRouter,
    })
  )

  const wss = new WebSocketServer({
    server: httpServer,
  })
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
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
