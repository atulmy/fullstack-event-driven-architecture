export const params = {
  // site
  site: {
    key: 'speechy',
    name: 'Speechy',
    tagline: 'Effortless Text-to-Speech and Speech-to-Text',
    description:
      'Speechy is built with a full-stack monorepo, featuring an event-driven, highly scalable architecture using Node.js, React, Redis, MongoDB, and Docker.',

    projects: {
      api: {
        core: 'api.core',
      },
    },
  },

  // common
  common: {
    endpoint: {
      rpc: '/rpc',
      upload: '/upload',
    },

    storage: {
      local: 'storage',
    },

    date: {
      format: {
        basic: 'YYYY-MM-DD',
        display: 'MMM D, YYYY, hh:mm a',
        full: 'YYYY-MM-DD hh:mm a',
      },
    },

    limits: {
      file: 1, // in MB
      email: 50,
      name: 50,
      password: 50,
      text: 500,
    },

    pagination: {
      default: 50,
    },

    error: {
      bad: 'BAD_REQUEST',
      unauthorized: 'UNAUTHORIZED',
      server: 'INTERNAL_SERVER_ERROR',
    },
  },

  // job
  job: {
    key: 'job',

    status: {
      processing: {
        key: 'processing',
        name: '⏱️ Processing',
      },

      failed: {
        key: 'failed',
        name: '⚠️ Failed',
      },

      completed: {
        key: 'completed',
        name: '✅ Completed',
      },
    },

    types: {
      stt: {
        key: 'stt',
        name: 'Speech to Text',

        channels: {
          start: 'job.stt.start',
          finish: 'job.stt.finish',
        },
      },

      tts: {
        key: 'tts',
        name: 'Text to Speech',

        channels: {
          start: 'job.tts.start',
          finish: 'job.tts.finish',
        },
      },
    },

    subscription: {
      updates: (userId) => `job.updates.${userId}`,
    },
  },

  // user
  user: {
    key: 'user',

    roles: {
      admin: {
        key: 'admin',
        name: 'Admin',
        access: ['admin', 'user'],
      },
      user: {
        key: 'user',
        name: 'User',
        access: ['user'],
      },
    },
  },
}
