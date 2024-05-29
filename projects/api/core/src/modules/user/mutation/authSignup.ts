// Imports
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'

// Common imports
import { params } from '@packages/common/build/params.js'
import { emailClean } from '@packages/common/build/utils.js'
import { User } from '@packages/model/build/user/model.js'

// App imports
import { procedurePublic } from '../../../server/rpc.js'
import { SECURITY_SALT_ROUNDS } from '../../../common/config/env.js'

// procedure
export const authSignup = procedurePublic
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const email = emailClean(input.email)
      const password = input.password.trim()
      const name = input.name.trim()

      // User
      const check = await User.findOne({ email, isDeleted: false }).lean()

      if (check) {
        return {
          success: false,
          message: `Account already exists with this email, please login to continue.`,
        }
      } else {
        // User - create
        const user = await User.create({
          email,
          password: await bcrypt.hash(`${password}`, SECURITY_SALT_ROUNDS),
          name,
          role: params.user.roles.user.key,
        })

        if (user) {
          return {
            success: true,
            message: `Registered successfully, please login to continue.`,
          }
        }
      }

      throw new Error('Sorry, unable to create an account, please try again.')
    } catch (error) {
      console.log('error', error)

      throw new TRPCError({
        code: params.common.error.server as TRPCError['code'],
        message: error.message,
      })
    }
  })
