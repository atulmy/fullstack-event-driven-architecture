// Common imports
import { params } from '@packages/common/build/params.js'

// App imports
import { subscriber } from '../../../server/redis.js'

// subscribe - start
subscriber.subscribe(params.job.types.tts.channels.finish, async (event) => {
  const { jobId, status, file } = JSON.parse(event)

  console.log('tts.finish jobId', jobId, status, file)
})
