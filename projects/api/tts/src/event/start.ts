// Imports
import { writeFile } from 'fs/promises'
import dayjs from 'dayjs'

// Common imports
import { params } from '@packages/common/params'

// App imports
import { subscriber, publisher } from '../server/redis'
import { openai } from '../common/config/openai'
import { storageFilePath } from '../common/helpers/utils'

// subscribe - start
subscriber.subscribe(params.job.types.tts.channels.start, async (event) => {
  const { jobId, data } = JSON.parse(event)

  try {
    if (jobId && data && data.text) {
      // openai - tts
      const audio = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: data.text,
      })

      if (audio) {
        // file
        const fileName = `${dayjs().valueOf()}.mp3`
        const filePath = storageFilePath(fileName)

        const buffer = Buffer.from(await audio.arrayBuffer())
        await writeFile(filePath, buffer)

        // redis - publish - finish (success)
        await publisher.publish(
          params.job.types.tts.channels.finish,
          JSON.stringify({
            jobId,
            status: params.job.status.completed.key,
            file: fileName,
          })
        )

        return true
      }
    }
  } catch (error) {
    console.log('error', error)
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
