// Imports
import {
  createTRPCProxyClient,
  httpBatchLink,
  createWSClient,
  wsLink,
  splitLink,
} from '@trpc/client'

// Project imports
// @ts-ignore
import type { AppRouter } from '../../../../../api/core/src/server/endpoint'

// Common imports
import { params } from '@packages/common/build/params.js'

// Local imports
import { URL_API_CORE, URL_API_CORE_WS } from '@/common/config/env'

// api
// @ts-ignore
export const api = createTRPCProxyClient<AppRouter>({
  links: [
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
          try {
            const data = window.localStorage.getItem('user')

            if (data) {
              const user = JSON.parse(data)
              if (user.token) {
                return {
                  authorization: `Bearer ${user.token}`,
                }
              }
            }
          } catch (error) {
            console.log('error', error)
          }
        },
      }),
    }),
  ],
})
