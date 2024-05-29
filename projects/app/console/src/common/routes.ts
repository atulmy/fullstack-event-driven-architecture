// Routes
export const routes = {
  // auth
  auth: {
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
