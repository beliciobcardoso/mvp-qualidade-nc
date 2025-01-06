import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import authConfig from './auth.config'
import prisma from './prisma'

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/signin',
    // signOut: "/auth/signout",
    // error: '/auth/error',
    verifyRequest: '',
    newUser: '',
  },
  session: { strategy: 'jwt', maxAge: 4 * 60 * 60 },
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
          const isValid = await bcrypt.compare(password, user?.passwordHash || '')
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
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.sub || ''
      return session
    },
  },
})
