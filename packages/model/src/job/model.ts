// Imports
import mongoose, { Schema } from 'mongoose'

// Local imports
import { User } from '../user/model.js'
import { JobInterface } from './types.js'

// Collection name
export const collection = 'Job'

// Schema
const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    data: {
      type: Object,
    },

    result: {
      type: Object,
    },
  },
  { timestamps: true }
)

// Model
export const Job = mongoose.model<JobInterface>(collection, schema, collection)
