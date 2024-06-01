// Routes
export const routes = {
  // home
  home: {
    path: '/',
  },

  // features
  features: {
    path: '/features',
  },

  // blog
  blog: {
    path: '/blog',

    detail: {
      path: (pageSlug) => `/blog/${pageSlug}`,
    },
  },
}
