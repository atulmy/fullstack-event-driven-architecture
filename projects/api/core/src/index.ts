// Local imports
import { app, httpServer } from './server/app.js'
import { middlewares } from './server/middlewares.js'
import './server/database.js'
import './server/redis.js'
import { upload } from './server/upload.js'
import { endpoint } from './server/endpoint.js'
import { start } from './server/start.js'

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
