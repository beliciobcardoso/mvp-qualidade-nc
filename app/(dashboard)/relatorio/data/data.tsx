import { CheckCircle, CirclePlus, Timer } from 'lucide-react'

export const statuses = [
  {
    value: 'created',
    label: 'Criado',
    icon: CirclePlus,
  },
  {
    value: 'in progress',
    label: 'Em andamento',
    icon: Timer,
  },
  {
    value: 'done',
    label: 'Finalizado',
    icon: CheckCircle,
  },
]
