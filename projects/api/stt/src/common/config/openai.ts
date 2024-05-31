// Imports
import OpenAI from 'openai'

// App imports
import { OPENAI_API_KEY } from './env.js'

// config
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})
