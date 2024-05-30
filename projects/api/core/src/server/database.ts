// Imports
import mongoose from 'mongoose'
mongoose.set('strictQuery', true)

// Local imports
import { ENV, DATABASE_URL } from '../common/config/env.js'

// Drop database
export async function drop() {
  if (ENV === 'development') {
    console.info('INFO - Dropping database..')
    try {
      return await mongoose.connection.dropDatabase()
    } catch (error) {
      console.error('error in dropping db', error.message)
    }
  }
}

// Disconnect database
export async function close() {
  console.info('INFO - Disconnecting database..')

  return await mongoose.connection.close()
}

// Handle connection close
mongoose.connection.on('close', () => {
  console.info('INFO - Database disconnected.')
})

// Handle connection error
mongoose.connection.on('error', (error) => {
  console.log(`ERROR - Connection failed: ${error.message}`)

  setTimeout(async () => {
    console.log('SETUP - Connecting database.. retrying..')

    await connectWithRetry()
  }, 5000)
})

// Retry connection
const connectWithRetry = async () => {
  return await mongoose.connect(DATABASE_URL)
}

// Connect database
console.info('SETUP - Connecting database..')

await connectWithRetry()
