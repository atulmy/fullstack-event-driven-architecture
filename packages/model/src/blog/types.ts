// Imports
import { Document as DocumentInterface } from 'mongoose'

// Interface
export interface BlogInterface extends DocumentInterface {
  title: string
  slug: string
  content: string
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}
