// Imports
import path from 'path'
import { createWriteStream } from 'fs'
import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'

// Common imports
import { params } from '@packages/common/build/params.js'

// App imports
import { ENV } from '../config/env.js'

// Utility functions

// Check development env
export function isDevelopment(): boolean {
  return ENV === 'development'
}

// storage - folder
export function storageFolder() {
  return path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    params.common.storage.local
  )
}

// storage - file path
export function storageFilePath(filename) {
  return path.join(storageFolder(), filename)
}

// storage - file delete
export function storageFileDelete(filePath) {
  try {
    unlink(filePath)
  } catch (error) {
    console.log('error storageFileDelete', error)
  }
}

// storage - download file from url
export async function storageFileDownload({ url, filePath }) {
  try {
    // fetch
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to download file: ${response.statusText}`)

    // Convert ReadableStream to Node.js Stream
    const reader = response.body.getReader()
    const stream = new Readable({
      async read() {
        const { done, value } = await reader.read()
        if (done) {
          this.push(null)
        } else {
          this.push(Buffer.from(value))
        }
      },
    })

    // Use pipeline to handle backpressure and end of stream
    await pipeline(stream, createWriteStream(filePath))

    return true
  } catch (error) {
    console.log('error storageFileDownload', error)
  }

  return false
}
