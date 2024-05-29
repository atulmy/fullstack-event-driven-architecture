// Imports
import { createClient } from 'redis'

// Local imports
import { REDIS_HOSTNAME } from '../common/config/env.js'
import { eventEmitter } from '../common/config/event.js'

// Connect redis
export let redisSub = null
export let redisPub = null

export async function connect() {
  if (REDIS_HOSTNAME) {
    console.info('SETUP - Connecting redis..')
    await connectWithRetry()
  }
}

// Disconnect redis
export async function close() {
  console.info('INFO - Disconnecting redis..')
}

// Retry connection
const connectWithRetry = async () => {
  try {
    redisSub = createClient({
      url: 'redis://' + REDIS_HOSTNAME,
    })
    await redisSub.connect()

    redisPub = createClient({
      url: 'redis://' + REDIS_HOSTNAME,
    })
    await redisPub.connect()

    // subscribe to all events
    redisSub.subscribe('events', (event) => {
      const { type, payload } = JSON.parse(event)

      console.log('redis', type, payload)

      // websocket
      eventEmitter.emit(type, payload)
    })
  } catch (error) {
    console.log('Failed to connect to Redis', error.message)
  }
}
