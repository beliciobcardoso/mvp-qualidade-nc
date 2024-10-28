'use server'
import { UserSchema } from '@/lib/formValidationSchemas'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { UserCreate, userUpdate } from './type'

export async function createUser(user: UserCreate) {
  const passwordHash = await hash(user.password, 10)
  try {
    const data = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        passwordHash,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(user: userUpdate) {
  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
  return data
}

export async function updatePassword(user: UserSchema) {
  const passwordHash = await hash(user.passwordHash, 10)
  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash,
    },
  })
  return data
}

export async function getData() {
  const data = await prisma.user.findMany()
  return data
}
