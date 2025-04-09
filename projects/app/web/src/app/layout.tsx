'use client'

// UI imports
import { Zoom, ToastContainer } from '@packages/ui/toast/index'
import { Head } from '@packages/ui/head/index'
import style from './layout.module.scss'

// Common imports
import { params } from '@packages/common/params'

// Local imports
import { Header } from '@/common/elements/header'

// Component
const Layout = ({ children }) => {
  // render
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <Head />
        <title>{`${params.site.name} - ${params.site.tagline}`}</title>
      </head>

      <body className={style.body}>
        <Header />

        <main className={style.main}>{children}</main>

        <ToastContainer hideProgressBar={true} transition={Zoom} position='top-center' stacked />
      </body>
    </html>
  )
}

export default Layout
