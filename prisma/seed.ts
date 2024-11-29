import { PrismaClient, Role } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash('12345678', 10)

  // USERS
  const users = [
    { email: 'fulano.tal@gemail.com', name: 'Fulano Tal', role: Role.ADMIN },
    { email: 'jane.doe@email.com', name: 'Jane Doe', role: Role.COORDINATOR },
    { email: 'maria.doe@email.com', name: 'Maria Doe', role: Role.ANALYST },
    { email: 'antonia.doe@email.com', name: 'Antonia Doe', role: Role.ANALYST },
    { email: 'jose.doe@email.com', name: 'José Doe', role: Role.USER },
    { email: 'pedro.doe@email.com', name: 'Pedro Doe', role: Role.TECHNICIAN },
  ]

  for (const user of users) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        avatar: '',
        passwordHash,
        role: user.role,
        createdAt: new Date(),
      },
    })
  }

  // Técnicos

  const technicians = [{ name: 'Técnico 1' }, { name: 'Técnico 2' }]

  for (const technician of technicians) {
    await prisma.technician.create({
      data: technician,
    })
  }

  // Clientes
  const clients = [
    { name: 'Cliente 1', img: 'https://via.placeholder.com/150' },
    { name: 'Cliente 2' },
  ]

  for (const client of clients) {
    await prisma.client.create({
      data: client,
    })
  }

  // Tipo de Estrutura
  const structureTypes = [
    { name: 'TORRE METÁLICA' },
    { name: 'POSTE CONCRETO' },
    { name: 'CAVALETE' },
    { name: 'POSTE METÁLICO' },
    { name: 'SUPORTE' },
    { name: 'OUTROS' },
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

  // Sites

  const client = await prisma.client.findFirst({
    where: {
      name: 'Cliente 1',
    },
  })

  const structureType = await prisma.structureType.findFirst({
    where: {
      name: 'TORRE METÁLICA',
    },
  })

  const siteType = await prisma.siteType.findFirst({
    where: {
      name: 'GREEN FIELD',
    },
  })

  if (client && structureType && siteType) {
    await prisma.site.create({
      data: {
        idSite: 'BR251552-AQW',
        altura: '20 metros',
        endereco: 'Rua das Flores',
        numero: '123',
        bairro: 'Jardim das Flores',
        cidade: 'São Paulo',
        uf: 'SP',
        client: {
          connect: {
            id: client.id,
          },
        },
        structureType: {
          connect: {
            id: structureType.id,
          },
        },
        siteType: {
          connect: {
            id: siteType.id,
          },
        },
      },
    })
  } else {
    console.error('Client, Structure Type or Site Type not  found.')
  }

  const client2 = await prisma.client.findFirst({
    where: {
      name: 'Cliente 2',
    },
  })

  const structureType2 = await prisma.structureType.findFirst({
    where: {
      name: 'SUPORTE',
    },
  })

  const siteType2 = await prisma.siteType.findFirst({
    where: {
      name: 'ROOF TOP',
    },
  })

  if (client2 && structureType2 && siteType2) {
    await prisma.site.create({
      data: {
        idSite: 'BR252556-ADF',
        altura: '10 metros',
        endereco: 'Rua das Rosas',
        numero: '321',
        bairro: 'Jardim das Rosas',
        cidade: 'São Paulo',
        uf: 'SP',
        client: {
          connect: {
            id: client2.id,
          },
        },
        structureType: {
          connect: {
            id: structureType2.id,
          },
        },
        siteType: {
          connect: {
            id: siteType2.id,
          },
        },
      },
    })
  } else {
    console.error('Client, Structure Type or Site Type not  found.')
  }

  // Relatórios

  const user1 = await prisma.user.findFirst({
    where: {
      name: 'Fulano Tal',
    },
  })

  const user2 = await prisma.user.findFirst({
    where: {
      name: 'Jane Doe',
    },
  })

  const analyst1 = await prisma.user.findFirst({
    where: {
      name: 'Maria Doe',
    },
  })

  const analyst2 = await prisma.user.findFirst({
    where: {
      name: 'Antonia Doe',
    },
  })

  const site1 = await prisma.site.findFirst({
    where: {
      idSite: 'BR251552-AQW',
    },
  })

  const site2 = await prisma.site.findFirst({
    where: {
      idSite: 'BR252556-ADF',
    },
  })

  const technician1 = await prisma.technician.findFirst({
    where: {
      name: 'Técnico 1',
    },
  })

  const technician2 = await prisma.technician.findFirst({
    where: {
      name: 'Técnico 2',
    },
  })

  if (site1 && technician1 && user1 && analyst1) {
    await prisma.report.create({
      data: {
        sites: {
          connect: {
            id: site1.id,
          },
        },
        client: {
          connect: {
            id: site1.idClient,
          },
        },
        technician: {
          connect: {
            id: technician1.id,
          },
        },
        user: {
          connect: {
            id: user1.id,
          },
        },
        analyst: {
          connect: {
            id: analyst1.id,
          },
        },
        dateService: new Date('2024-10-10'),
      },
    })
  } else {
    console.error('Site, Technician, User, or Analyst not found.')
  }

  if (site2 && technician2 && user2 && analyst2) {
    await prisma.report.create({
      data: {
        sites: {
          connect: {
            id: site2.id,
          },
        },
        client: {
          connect: {
            id: site2.idClient,
          },
        },
        technician: {
          connect: {
            id: technician2.id,
          },
        },
        user: {
          connect: {
            id: user2.id,
          },
        },
        analyst: {
          connect: {
            id: analyst2.id,
          },
        },
        dateService: new Date('2024-10-11'),
      },
    })
  } else {
    console.error('Site or Technician not found.')
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
