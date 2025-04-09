// UI imports
import '@radix-ui/colors/blue.css'
import '@radix-ui/colors/blue-alpha.css'
import '@radix-ui/colors/blue-dark.css'
import '@radix-ui/colors/blue-dark-alpha.css'
import '@radix-ui/colors/gray.css'
import '@radix-ui/colors/gray-alpha.css'
import '@radix-ui/colors/gray-dark.css'
import '@radix-ui/colors/gray-dark-alpha.css'
import '@radix-ui/colors/black-alpha.css'
import 'the-new-css-reset/css/reset.css'
import './variables.css'
import './base.css'

// Common imports
import { params } from '@packages/common/params'

// Component
export const Head = () => (
  <>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />

    <meta name='theme-color' content='#000000' />
    <meta name='msapplication-TileColor' content='#000000' />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

    <meta property='og:site_name' content={params.site.name} />
    <meta property='og:type' content='website' />

    <meta property='copyright' content={params.site.name} />
    <meta property='application-name' content={params.site.name} />

    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;600&display=swap'
    />
  </>
)
