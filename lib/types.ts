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
