// App imports
import './events/index.js'
import './server/redis.js'
import { app, httpServer } from './server/app.js'
import { middlewares } from './server/middlewares.js'
import { start } from './server/start.js'

// boot
;(async function () {
  // middlewares
  middlewares(app)

  // start
  await start(app, httpServer)
})()
