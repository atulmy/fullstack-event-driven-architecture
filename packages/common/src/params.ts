export const params = {
  // site
  site: {
    key: 'fullstack',
    name: 'Fullstack',
    tagline: 'Full-Stack Event Driven Architecture',
    description:
      'Full-stack event driven and highly scalable architecture using Node, React, Redis, MongoDB, and Docker.',
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
      },
    },

    limits: {
      file: 1, // in MB
      email: 50,
      name: 50,
      password: 50,
    },

    pagination: {
      default: 10,
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

        topics: {
          start: 'stt-start-topic',
          finish: 'stt-finish-topic',
        },

        subscriptions: {
          start: 'stt-start-subscription',
          finish: 'stt-finish-subscription',
        },
      },

      tts: {
        key: 'tts',
        name: 'Text to Speech',

        topics: {
          start: 'tts-start-topic',
          finish: 'tts-finish-topic',
        },

        subscriptions: {
          start: 'tts-start-subscription',
          finish: 'tts-finish-subscription',
        },
      },
    },
  },

  // user
  user: {
    key: 'user',

    roles: {
      admin: {
        key: 'admin',
        title: 'Admin',
        access: ['admin', 'user'],
      },
      user: {
        key: 'user',
        title: 'User',
        access: ['user'],
      },
    },
  },
}
