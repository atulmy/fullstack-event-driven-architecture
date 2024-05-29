// Imports
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)

// Local imports
import { close, database } from '../database.js'

// cd projects/api.core && NODE_ENV=development node --loader ts-node/esm ./src/server/scripts/test.ts

// test
;(async () => {
  const timeStart = performance.now()

  try {
    // Connect database
    await database()

    // Close database
    await close()
  } catch (error) {
    console.log('script error', error)
  }

  console.log(
    `MIGRATION - Completed in ${dayjs
      .duration(performance.now() - timeStart)
      .format('HH:mm:ss')} ✅`
  )
})()
