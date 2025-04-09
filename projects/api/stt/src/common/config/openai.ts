// Imports
import OpenAI from 'openai'

// App imports
import { OPENAI_API_KEY } from './env'

// config
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})
