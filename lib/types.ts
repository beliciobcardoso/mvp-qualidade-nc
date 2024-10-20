import { ReactNode } from 'react'

export type Relatorio = {
  id?: number
  nomeCliente: string
  idSite: string
  altura?: string
  endereco: string
  bairro: string
  numero: string
  cidade: string
  uf: string
  tecnico: string
  dataServico: Date
  createdAt: Date
  updatedAt?: Date
  finishedAt?: Date
  tipoSite: string
  tipoEstrutura: string
}

export type DialogReportProps = {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  relatorio?: Relatorio
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
  services: string
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
