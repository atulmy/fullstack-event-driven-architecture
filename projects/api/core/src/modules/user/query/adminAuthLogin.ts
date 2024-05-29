// Imports
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/build/params.js'
import { emailClean } from '@packages/common/build/utils.js'
import { User } from '@packages/model/build/user/model.js'

// App imports
import { SECURITY_SECRET } from '../../../common/config/env.js'
import { procedurePublic } from '../../../server/rpc.js'

// procedure
export const adminAuthLogin = procedurePublic
  .input(z.object({ email: z.string(), password: z.string() }))
  .query(async (payload) => {
    try {
      const email = emailClean(payload.input.email)
      const password = emailClean(payload.input.email)

      // Get user
      const user = await User.findOne({
        email,
        role: params.user.roles.admin.key,
        isDeleted: false,
      }).lean()

      // Check if user exists
      if (user) {
        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (passwordsMatch) {
          return {
            data: {
              isAuthenticated: true,
              token: jwt.sign({ id: user._id }, SECURITY_SECRET),
              user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
              },
            },
            success: true,
            message: `Welcome ${user.name}!`,
          }
        }
      }

      throw new Error('Sorry, invalid credentials, please try again.')
    } catch (error) {
      console.log('error', error)

      throw new TRPCError({
        code: params.common.error.server as TRPCError['code'],
        message: error.message,
      })
    }
  })
