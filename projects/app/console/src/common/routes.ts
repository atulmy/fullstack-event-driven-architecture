// Routes
export const routes = {
  // login
  login: {
    path: '/',
  },

  // users
  users: {
    path: '/users',

    save: {
      path: (userId) => `/users/${userId}`,
    },
  },

  // blog
  blog: {
    path: '/blog',

    save: {
      path: (blogId = 'create') => `/blog/${blogId}`,
    },
  },
}
