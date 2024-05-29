// App imports
import { app, httpServer } from './server/app.js'
import { middlewares } from './server/middlewares.js'
import { database } from './server/database.js'
import { connect as redis } from './server/redis.js'
import { upload } from './server/upload.js'
import { endpoint } from './server/endpoint.js'
import { start } from './server/start.js'

// boot
;(async function () {
  // middlewares
  middlewares(app)

  // database
  await database()

  // redis
  await redis()

  // upload
  upload(app)

  // endpoint
  endpoint(app, httpServer)

  // start
  await start(app, httpServer)
})()
