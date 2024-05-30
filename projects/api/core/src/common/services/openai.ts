// Imports
import OpenAI from 'openai'

// Local imports
import { OPENAI_API_KEY } from '../config/env.js'

// config
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})
