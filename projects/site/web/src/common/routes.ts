// Routes
export const routes = {
  // home
  home: {
    path: '/',
  },

  // blog
  blog: {
    path: '/blog',

    detail: {
      path: (pageSlug) => `/blog/${pageSlug}`,
    },
  },
}
