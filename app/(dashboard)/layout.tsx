import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth'
import { User } from '@/lib/types'
import { SessionProvider } from 'next-auth/react'
import { cookies } from 'next/headers'
import { getUserByEmail } from './admin/user/actions'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const user = session?.user as User
  let dataUser: User | null = null
  if (session) {
    dataUser = await getUserByEmail(user.email)
  }

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'false'
  return (
    <SessionProvider session={session}>
      <SidebarProvider defaultOpen={defaultOpen}>
        {dataUser && <AppSidebar userData={dataUser} />}
        <SidebarInset>
          <main className="flex flex-1 flex-col space-y-4 pr-2">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  )
}
