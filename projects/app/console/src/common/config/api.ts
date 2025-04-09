// Imports
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'

// Package imports
import { params } from '@packages/common/params'

// Project imports
// @ts-ignore
import type { AppRouter } from '../../../../../api/core/src/server/endpoint'

// Local imports
import { URL_API_CORE } from '@/common/config/env'
import { authHeader, isDevelopment } from '@/common/helpers/utils'

// api
export const api = createTRPCClient<AppRouter>({
  links: [
    // logger link
    loggerLink({
      enabled: () => isDevelopment(),
    }),

    // http batch link
    httpBatchLink({
      url: `${URL_API_CORE}${params.common.endpoint.rpc}`,

      async headers() {
        return authHeader()
      },
    }),
  ],
})
