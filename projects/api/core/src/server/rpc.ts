// Imports
import { initTRPC, TRPCError } from '@trpc/server'

// Common imports
import { params } from '@packages/common/params'
import { authCheck } from '@packages/common/utils'
import { UserInterface } from '@packages/model/user/types'

// init
const t = initTRPC
  .context<{
    auth?: {
      isAuthenticated: boolean
      token: string
      user?: UserInterface
    }
    ip: string
  }>()
  .create()

export const router = t.router
export const mergeRouters = t.mergeRouters

// public
export const procedurePublic = t.procedure

// private - user
export const procedureUser = t.procedure.use(async ({ ctx, next }) => {
  if (ctx.auth && ctx.auth.isAuthenticated) {
    return next({
      ctx: {
        auth: ctx.auth,
      },
    })
  }

  throw new TRPCError({
    code: params.common.error.unauthorized as TRPCError['code'],
    message: 'You are not authorized to perform this action.',
  })
})

// private - admin
export const procedureAdmin = t.procedure.use(async ({ ctx, next }) => {
  if (authCheck(ctx.auth, params.user.roles.admin.key)) {
    return next({
      ctx: {
        auth: ctx.auth,
      },
    })
  }

  throw new TRPCError({
    code: params.common.error.unauthorized as TRPCError['code'],
    message: 'You are not authorized to perform this action.',
  })
})
