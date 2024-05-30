// Imports
import { createClient } from 'redis'

// Local imports
import { REDIS_HOSTNAME } from '../common/config/env.js'

console.info('SETUP - Connecting to Redis..')

// Create a Redis client for subscribing
export const subscriber = createClient({
  url: 'redis://' + REDIS_HOSTNAME,
})
subscriber.connect()

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
