import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // USERS
  await prisma.user.create({
    data: {
      email: 'fulano.tal@gemail.com',
      name: 'Fulano Tal',
      passwordHash: '123456',
      role: Role.ADMIN,
      createdAt: new Date(),
    },
  })

  await prisma.user.create({
    data: {
      email: 'jane.doe@email.com',
      name: 'Jane Doe',
      passwordHash: '123456',
      role: Role.COORDINATOR,
      createdAt: new Date(),
    },
  })

  await prisma.user.create({
    data: {
      email: 'maria.doe@email.com',
      name: 'Maria Doe',
      passwordHash: '123456',
      role: Role.ANALYST,
      createdAt: new Date(),
    },
  })

  await prisma.user.create({
    data: {
      email: 'jose.doe@email.com',
      name: 'José Doe',
      passwordHash: '123456',
      role: Role.USER,
      createdAt: new Date(),
    },
  })

  await prisma.user.create({
    data: {
      email: 'pedro.doe@email.com',
      name: 'Pedro Doe',
      passwordHash: '123456',
      role: Role.TECHNICIAN,
      createdAt: new Date(),
    },
  })

  // Tecnicos

  await prisma.technician.create({
    data: {
      name: 'Técnico 1',
    },
  })

  await prisma.technician.create({
    data: {
      name: 'Técnico 2',
    },
  })

  // Clientes
  await prisma.client.create({
    data: {
      name: 'Cliente 1',
      img: 'https://via.placeholder.com/150',
    },
  })

  await prisma.client.create({
    data: {
      name: 'Cliente 2',
    },
  })

  // Tipo de Estrutura
  const structureTypes = [
    { name: 'TORRE METÁLICA' },
    { name: 'POSTE CONCRETO' },
    { name: 'CAVALETE' },
    { name: 'POSTE METÁLICO' },
    { name: 'SUPORTE' },
    { name: 'OUTROS' },
    { name: 'TORRE DE ALUMÍNIO' },
    { name: 'TORRE DE FIBRA' },
    { name: 'TORRE DE PLÁSTICO' },
    { name: 'TORRE DE PEDRA' },
    { name: 'TORRE DE CIMENTO' },
  ]

  for (const structureType of structureTypes) {
    await prisma.structureType.create({
      data: {
        name: structureType.name,
      },
    })
  }

  // Tipos de sites
  const siteTypes = [{ name: 'GREEN FIELD' }, { name: 'ROOF TOP' }]

  for (const siteType of siteTypes) {
    await prisma.siteType.create({
      data: {
        name: siteType.name,
      },
    })
  }

  console.log('Seeding completed successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
