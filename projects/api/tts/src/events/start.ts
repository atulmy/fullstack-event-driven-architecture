// Imports
import { writeFile } from 'fs/promises'
import dayjs from 'dayjs'

// Common imports
import { params } from '@packages/common/build/params.js'

// App imports
import { subscriber, publisher } from '../server/redis.js'
import { openai } from '../common/config/openai.js'
import { storageFilePath, storageFileDelete } from '../common/helpers/utils.js'

// subscribe - start
subscriber.subscribe(params.job.types.tts.channels.start, async (event) => {
  const { jobId, data } = JSON.parse(event)

  console.log('jobId', jobId)

  // websocket
  try {
    if (jobId && data && data.text) {
      // openai - tts
      const audio = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: data.text,
      })

      let status = params.job.status.failed.key
      let file = ''

      if (audio) {
        const fileName = `${dayjs().valueOf()}.mp3`
        const filePath = storageFilePath(fileName)

        console.log(filePath)

        const buffer = Buffer.from(await audio.arrayBuffer())
        await writeFile(filePath, buffer)

        // delete local file
        // storageFileDelete(filePath)

        status = params.job.status.completed.key
        file = fileName

        // redis - publish - finish (success)
        await publisher.publish(
          params.job.types.tts.channels.finish,
          JSON.stringify({
            jobId,
            status,
            file,
          })
        )
      }
    }
  } catch (error) {
    console.log('error execute', error)
  }

  // redis - publish - finish (failed)
  await publisher.publish(
    params.job.types.tts.channels.finish,
    JSON.stringify({
      jobId,
      status: params.job.status.failed.key,
    })
  )
})
