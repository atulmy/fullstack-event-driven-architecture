// Routes
export const routes = {
  // login
  login: {
    path: '/',
  },

  // users
  users: {
    path: '/users',
  },

  // jobs
  jobs: {
    path: '/jobs',
  },

  // blog
  blog: {
    path: '/blog',

    save: {
      path: (blogId = 'create') => `/blog/${blogId}`,
    },
  },
}
