// Imports
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// Common imports
import { params } from '@packages/common/build/params.js'

// Local imports
import { isDevelopment } from '../common/helpers/utils.js'

// middlewares
export function middlewares(app) {
  console.info('SETUP - Middlewares..')

  // Enable CORS
  app.use(cors())

  // Request body parser
  app.use(bodyParser.json({ limit: `${params.common.limits.file}mb` }))
  app.use(
    bodyParser.urlencoded({
      limit: `${params.common.limits.file}mb`,
      extended: true,
    })
  )

  // storage
  app.use(
    express.static(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        '..',
        '..',
        params.common.storage.local
      )
    )
  )

  // Trust Proxy
  app.set('trust proxy', true)

  // HTTP logger
  if (isDevelopment()) {
    app.use(morgan('tiny'))
  }
}
