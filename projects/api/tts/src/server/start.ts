// Imports
import ip from 'ip'

// App imports
import { PORT, ENV } from '../common/config/env.js'

// Start server
export async function start(app, server) {
  console.info('SETUP - Starting server..')

  const serverProcess = server.listen(PORT, () => {
    console.info(`INFO - Server started on - `)
    console.info(`  Local     http://localhost:${PORT} [${ENV}]`)
    console.info(`  Network   http://${ip.address()}:${PORT} [${ENV}]`)
    console.info(`  Datetime ${new Date()}`)
    console.info(`  Welcome to api.tts\n`)
  })

  serverProcess.setTimeout(3600000)

  // Stop Server
  for (let signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, async () => {
      console.info('INFO - Shutting down server..')

      serverProcess.close(async () => {
        console.info('INFO - Server has been shut down.')
      })
    })
  }
}
