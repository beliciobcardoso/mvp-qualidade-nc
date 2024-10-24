export interface DialogReportProps {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  dialogPerson?: {
    nome: string
    email: string
    cargo: string
  }
}

export interface PersonProps {
  person: string
}
