// Common imports
import { params } from '@packages/common/build/params.js'
import { Job } from '@packages/model/build/job/model.js'

// App imports
import { subscriber } from '../../../server/redis.js'
import { eventEmitter } from '../../../common/config/event.js'

// subscribe - start
subscriber.subscribe(params.job.types.tts.channels.finish, async (event) => {
  const { jobId, status, file } = JSON.parse(event)

  console.log('tts.finish jobId', jobId, status, file)

  // Job - update
  const updated = await Job.updateOne({ _id: jobId }, { $set: { status, result: { file } } })

  if (updated) {
    // Job
    const job = await Job.findOne({ _id: jobId }).lean()

    if (job) {
      // websocket
      eventEmitter.emit(params.job.types.tts.channels.finish, job)
    }
  }
})
