'use client'

// UI imports
import '@packages/ui/build/index.css'
import { Zoom, ToastContainer } from '@packages/ui/build/toast'
import { Head } from '@packages/ui/build/head'

// Common imports
import { params } from '@packages/common/build/params'

// Component
const Layout = ({ children }) => {
  // render
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <Head />
        <title>{`${params.site.name} - ${params.site.tagline}`}</title>
      </head>

      <body>
        {children}

        <ToastContainer hideProgressBar={true} transition={Zoom} position='top-center' stacked />
      </body>
    </html>
  )
}

export default Layout
