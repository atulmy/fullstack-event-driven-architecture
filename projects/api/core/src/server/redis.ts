// Imports
import { createClient } from 'redis'

// Common imports
import { params } from '@packages/common/params'

// Local imports
import { REDIS_HOSTNAME } from '../common/config/env'
import { eventEmitter } from '../common/config/event'

console.info('SETUP - Connecting to Redis..')

// Create a Redis client for subscribing
export const subscriber = createClient({
  url: 'redis://' + REDIS_HOSTNAME,
})
subscriber.connect()

// subscribe to all events
subscriber.subscribe(params.site.projects.api.core, (event) => {
  try {
    const { type, payload } = JSON.parse(event)

    if (type) {
      // websocket
      eventEmitter.emit(type, payload)
    }
  } catch (error) {}
})

subscriber.on('error', (error) => {
  console.log(`ERROR - Connection failed Redis subscriber: ${error.message}`)
})

// Create a Redis client for subscribing
export const publisher = createClient({
  url: 'redis://' + REDIS_HOSTNAME,
})
publisher.connect()

publisher.on('error', (error) => {
  console.log(`ERROR - Connection failed Redis publisher: ${error.message}`)
})

// Disconnect database
export async function close() {
  console.info('INFO - Disconnecting redis..')

  await publisher.quit()
  await subscriber.quit()

  console.info('INFO - Redis disconnected.')
}
