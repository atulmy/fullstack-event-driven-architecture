// Imports
import path from 'path'
import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'

// Common imports
import { params } from '@packages/common/build/params.js'

// Local imports
import { ENV } from '../config/env.js'

// Utility functions

// Check development env
export function isDevelopment(): boolean {
  return ENV === 'development'
}

// storage folder
export function storageFolder() {
  return path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    params.common.storage.local
  )
}

// storage file path
export function storageFilePath(filename) {
  return path.join(storageFolder(), filename)
}

// storage file delete
export function storageFileDelete(filePath) {
  try {
    unlink(filePath)
  } catch (error) {
    console.log('error storageFileDelete', error)
  }
}
