// Imports
import { createClient } from 'redis'

// Local imports
import { REDIS_HOSTNAME } from '../common/config/env.js'

// Create a Redis client for subscribing
export const subscriber = createClient({
  url: 'redis://' + REDIS_HOSTNAME,
})
subscriber.connect()

subscriber.on('error', (err) => {
  console.error('Redis error:', err)
})

// Connect to Redis and subscribe to a channel
subscriber.on('connect', () => {
  console.log('Connected to Redis subscriber')
})

// Create a Redis client for subscribing
export const publisher = createClient({
  url: 'redis://' + REDIS_HOSTNAME,
})
publisher.connect()

publisher.on('error', (err) => {
  console.error('Redis error:', err)
})

// Connect to Redis and subscribe to a channel
publisher.on('connect', () => {
  console.log('Connected to Redis publisher')
})
