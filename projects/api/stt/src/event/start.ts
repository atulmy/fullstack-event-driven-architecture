// Imports
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import dayjs from 'dayjs'

// Common imports
import { params } from '@packages/common/params'

// App imports
import { URL_API_CORE } from '../common/config/env'
import { subscriber, publisher } from '../server/redis'
import { openai } from '../common/config/openai'
import { storageFilePath, storageFileDownload, storageFileDelete } from '../common/helpers/utils'

// subscribe - start
subscriber.subscribe(params.job.types.stt.channels.start, async (event) => {
  const { jobId, data } = JSON.parse(event)

  try {
    if (jobId && data && data.file) {
      const filePath = storageFilePath(data.file)

      // download file
      const downloaded = await storageFileDownload({
        url: `${URL_API_CORE}/${data.file}`,
        filePath,
      })

      if (downloaded) {
        // openai - stt
        const transcription = await openai.audio.transcriptions.create({
          file: createReadStream(filePath),
          model: 'whisper-1',
        })

        // delete file
        await storageFileDelete(filePath)

        if (transcription) {
          // redis - publish - finish (success)
          await publisher.publish(
            params.job.types.stt.channels.finish,
            JSON.stringify({
              jobId,
              status: params.job.status.completed.key,
              text: transcription.text,
            })
          )

          return true
        }
      }
    }
  } catch (error) {
    console.log('error', error)
  }

  // redis - publish - finish (failed)
  await publisher.publish(
    params.job.types.stt.channels.finish,
    JSON.stringify({
      jobId,
      status: params.job.status.failed.key,
    })
  )
})
