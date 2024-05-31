// Imports
import path from 'path'
import Multer from 'multer'
import dayjs from 'dayjs'

// Common imports
import { params } from '@packages/common/build/params.js'

// File upload configurations and route
export function upload(app) {
  console.info('SETUP - Upload..')

  // Upload
  const multer = Multer({
    storage: Multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, params.common.storage.local)
      },
      filename: function (req, file, cb) {
        cb(null, `${dayjs().valueOf()}` + path.extname(file.originalname).toLocaleLowerCase())
      },
    }),
  })

  app.post(params.common.endpoint.upload, [multer.single('file')], async (request, response) => {
    try {
      const file = request.file

      if (file.mimetype === 'audio/mpeg') {
        return response.status(200).json({
          success: true,
          message: 'File uploaded successfully.',
          data: file.filename,
        })
      } else {
        return response.status(400).json({
          success: false,
          message: 'Unsupported file format.',
        })
      }
    } catch (error) {
      console.log('error', error)

      return response.json({
        success: false,
        message: 'There was some error uploading the file. Please try again.',
        file: null,
      })
    }
  })
}
