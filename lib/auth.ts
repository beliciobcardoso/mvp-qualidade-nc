import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import authConfig from './auth.config'
import prisma from './prisma'
import { Role } from './types'

declare module 'next-auth' {
  interface User {}
  interface Account {}
  interface Session {
    user: {
      role: Role
    } & DefaultSession['user']
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/signin',
    // signOut: "/auth/signout",
    // error: '/auth/error',
    verifyRequest: '',
    newUser: '',
  },
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string
        const password = credentials.password as string

        const user = await prisma.user.findFirst({ where: { email } })

        if (user) {
          const isValid = await bcrypt.compare(
            password,
            user?.passwordHash || '',
          )
          if (isValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              image: user.avatar,
            }
          }
          return null
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return { ...session }
    },
  },
})
