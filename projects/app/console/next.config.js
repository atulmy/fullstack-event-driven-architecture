module.exports = {
  devIndicators: {
    buildActivity: false,
  },

  poweredByHeader: false,

  reactStrictMode: false,

  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
    missingSuspenseWithCSRBailout: false,
  },
}
