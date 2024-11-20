import { Dashboard } from '@/components/dashboard'
import HeaderPage from '@/components/header-page'
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
      <HeaderPage pageName={'Dashboard'} />
      <Dashboard DataReports={totalReports} />
    </main>
  )
}
