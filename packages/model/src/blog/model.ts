// Imports
import mongoose, { Schema } from 'mongoose'

// App imports
import { BlogInterface } from './types.js'

// Collection name
export const collection: string = 'Blog'

// Schema
const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
)

// Model
export const Blog = mongoose.model<BlogInterface>(collection, schema, collection)
