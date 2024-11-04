import { ReactNode } from 'react'

export type UserCreate = {
  name: string
  email: string
  role: 'ADMIN' | 'USER' | 'ANALYST' | 'TECHNICIAN' | 'COORDINATOR'
  password: string
}

export type UserUpdate = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER' | 'ANALYST' | 'TECHNICIAN' | 'COORDINATOR'
}

export type UserForm = {
  id?: string
  name: string
  avatar?: string
  email: string
  role: 'ADMIN' | 'USER' | 'ANALYST' | 'TECHNICIAN' | 'COORDINATOR'
  createdAt: Date
}

export type ClientType = {
  id: string
  name: string
  img: string | null
}

export type TipoSiteType = {
  id: number
  name: string
}

export type StructureType = {
  id: number
  name: string
}

export type SiteType = {
  id: number
  idSite: string
  altura: string
  endereco: string
  bairro: string
  cidade: string
  numero: string
  uf: string
  idClient: string
  siteTypeId: number
  structureTypeId: number
}

export type SiteTypeRel = {
  id: number
  idSite: string
  altura: string
  endereco: string
  bairro: string
  cidade: string
  numero: string
  uf: string
  client: {
    name: string
  }
  siteType: {
    name: string
  }
  structureType: {
    name: string
  }
}

export type Relatorio = {
  id?: number
  siteId: number
  dateService: Date
  createdAt: Date
  updatedAt: Date | null
  finishedAt: Date | null
  clientId: string
  technicianId: string
  userId: string | null
  technician: {
    name: string
  }
  client: {
    name: string
  }
  user: {
    name: string
  }
  sites: SiteType
}

export type DialogNewProps = {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  relatedData?: UserForm
  openDialog?: boolean
}

export type DialogNewSiteProps = {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  openDialog?: boolean
  structureData?: StructureType[]
  siteTypeData?: TipoSiteType[]
  clientData?: ClientType[]
  dialogData?: SiteTypeRel
}

export type DialogReportProps = {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  relatorio?: Relatorio
  dataUser: {
    id: string
    name: string
    avatar: string
    email: string
    role: 'ADMIN' | 'USER' | 'ANALYST' | 'TECHNICIAN' | 'COORDINATOR'
  }
}
export type PersonProps = {
  person: string
}

export type PhotoAnalisysType = {
  id?: number
  idReport: number
  url: string
  name: string
  description: string
}

export type Photo = {
  id: number
  title: string
  url: string
  description: string
}

export type DescriptionAnalisysType = {
  idReport: number
  service: string
  status: string
}

export type DescriptionAnalisysFull = {
  id: number
  idReport: number
  services: string
  status: string
}

export type ModalAddCardPhotoType = {
  textButton: ReactNode | string
  textTitle: string
  textDescription: string
}
