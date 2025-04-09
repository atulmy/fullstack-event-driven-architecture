// Local imports
import { app, httpServer } from './server/app'
import { middlewares } from './server/middlewares'
import './server/database'
import './server/redis'
import { upload } from './server/upload'
import { endpoint } from './server/endpoint'
import { start } from './server/start'

// boot
;(async function () {
  // middlewares
  middlewares(app)

  // upload
  upload(app)

  // endpoint
  endpoint(app, httpServer)

  // start
  await start(app, httpServer)
})()
