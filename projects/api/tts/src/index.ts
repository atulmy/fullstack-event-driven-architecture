// App imports
import './server/redis'
import './event/index'
import { app, httpServer } from './server/app'
import { middlewares } from './server/middlewares'
import { start } from './server/start'

// boot
;(async function () {
  // middlewares
  middlewares(app)

  // start
  await start(app, httpServer)
})()
