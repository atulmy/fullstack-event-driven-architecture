// Imports
import { Document as DocumentInterface } from 'mongoose'

// Local imports
import { UserInterface } from '../user/types.js'

// Interface
export interface JobInterface extends DocumentInterface {
  userId: UserInterface
  type: string
  status: string
  data: object
  result?: object
  createdAt: Date
  updatedAt: Date
}
