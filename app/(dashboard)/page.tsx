import { Dashboard } from '@/components/dashboard'
import { getUserRoleCount } from './admin/user/actions'
import {
  getTotalReportsCreated,
  getTotalReportsFinished,
  getTotalReportsInProgress,
} from './relatorio/actions'

export default async function Home() {
  const totalReports = {
    created: await getTotalReportsCreated(),
    inProgress: await getTotalReportsInProgress(),
    finished: await getTotalReportsFinished(),
    analyst: await getUserRoleCount('ANALYST'),
  }

  return (
    <main>
      <Dashboard DataReports={totalReports} />
    </main>
  )
}
