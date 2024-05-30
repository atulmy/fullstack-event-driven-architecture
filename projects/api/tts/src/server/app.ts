// Imports
import http from 'http'
import express from 'express'

// Create express server
const app = express()
const httpServer = http.createServer(app)

export { app, httpServer }
