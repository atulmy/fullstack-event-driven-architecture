// Imports
import {
  createTRPCClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  wsLink,
} from '@trpc/client'

// Package imports
import { params } from '@packages/common/params'

// Project imports
// @ts-ignore
import type { AppRouter } from '../../../../../api/core/src/server/endpoint'

// Local imports
import { URL_API_CORE, URL_API_CORE_WS } from '@/common/config/env'
import { authHeader, isDevelopment } from '@/common/helpers/utils'

// api
export const api = createTRPCClient<AppRouter>({
  links: [
    // logger link
    loggerLink({
      enabled: () => isDevelopment(),
    }),

    splitLink({
      condition: (op) => op.type === 'subscription',

      // websocket
      true: wsLink({
        client: createWSClient({
          url: URL_API_CORE_WS,
        }),
      }),

      // http
      false: httpBatchLink({
        url: `${URL_API_CORE}${params.common.endpoint.rpc}`,

        async headers() {
          return authHeader()
        },
      }),
    }),
  ],
})
