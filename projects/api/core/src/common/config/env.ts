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

// Database
export const DATABASE_URL: string = process.env.DATABASE_URL!

// Security
export const SECURITY_SECRET: string = process.env.SECURITY_SECRET!
export const SECURITY_SALT_ROUNDS: number = parseInt(`${process.env.SECURITY_SALT_ROUNDS!}`)

// URL
export const URL_API_CORE = process.env.URL_API_CORE!

// Redis
export const REDIS_HOSTNAME: string = process.env.REDIS_HOSTNAME!
