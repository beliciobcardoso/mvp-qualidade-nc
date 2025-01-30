'use server'
import prisma from '@/lib/prisma'
import type { CheckInType } from '@/lib/types'

export async function createCheckIn(data: CheckInType) {
  try {
    const checkIn = await prisma.checkin.create({
      data: {
        ...data,
      },
    })
    return checkIn
  } catch (error) {
    console.log(error)
  }
}

export async function updateCheckIn(data: CheckInType) {
  try {
    const checkIn = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
    return checkIn
  } catch (error) {
    console.log(error)
  }
}

export async function getCheckInById(id: number) {
  try {
    const checkIn = await prisma.checkin.findFirst({
      where: {
        id,
      },
    })
    return checkIn
  } catch (error) {
    console.log(error)
  }
}

export async function getAllCheckIn() {
  try {
    const data = await prisma.checkin.findMany({})
    return data
  } catch (error) {
    console.log(error)
  }
}
