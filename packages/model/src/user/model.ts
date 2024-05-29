// Imports
import mongoose, { Schema } from 'mongoose'

// Common imports
import { params } from '@packages/common/build/params.js'

// Local imports
import { UserInterface } from './types.js'

// Collection name
export const collection: string = 'User'

// Schema
const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: false,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      default: params.user.roles.user.key,
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
export const User = mongoose.model<UserInterface>(collection, schema, collection)
