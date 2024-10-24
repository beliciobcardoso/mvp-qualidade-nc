'use server'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createUser(user: Omit<User, 'id'>) {
  //   console.log(user)
  try {
    const data = await prisma.user.create({
      data: {
        ...user,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(user: User) {
  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  })
  return data
}

export async function getData() {
  const data = await prisma.user.findMany()
  return data
}
