// Imports
import dotenv from 'dotenv'

// Environment
export const ENV: string = process.env.NODE_ENV!

const ENV_FILE = `.env.${ENV}`
console.log('SETUP - ENV_FILE', ENV_FILE)

// Load .env.local
dotenv.config({ path: ENV_FILE })

// Port
export const PORT: number = parseInt(`${process.env.PORT!}`)

// URL
export const URL_API_CORE = process.env.URL_API_CORE!
export const URL_API_TTS = process.env.URL_API_TTS!

// Redis
export const REDIS_HOSTNAME: string = process.env.REDIS_HOSTNAME!

// Services
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY!
