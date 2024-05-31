// Common imports
import { params } from '@packages/common/build/params.js'
import { Job } from '@packages/model/build/job/model.js'

// App imports
import { subscriber, publisher } from '../../../server/redis.js'

// subscribe - start
subscriber.subscribe(params.job.types.tts.channels.finish, async (event) => {
  const { jobId, status, file } = JSON.parse(event)

  // Job - update
  const updated = await Job.updateOne({ _id: jobId }, { $set: { status, result: { file } } })

  if (updated) {
    // Job
    const job = await Job.findOne({ _id: jobId }).lean()

    if (job) {
      // redis - publish (emit in all server instances)
      await publisher.publish(
        params.site.projects.api.core,
        JSON.stringify({
          type: params.job.subscription.updates(job.userId),
          payload: job,
        })
      )
    }
  }
})
