// Imports
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/params'
import { emailClean } from '@packages/common/utils'
import { User } from '@packages/model/user/model'

// Local imports
import { SECURITY_SECRET } from '../../../common/config/env'
import { procedurePublic } from '../../../server/rpc'

// procedure
export const authLogin = procedurePublic
  .input(z.object({ email: z.string(), password: z.string() }))
  .query(async ({ input }) => {
    try {
      const email = emailClean(input.email)
      const password = input.password.trim()

      // Get user
      const user = await User.findOne({
        email,
        role: {
          $in: [params.user.roles.user.key, params.user.roles.admin.key],
        },
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
