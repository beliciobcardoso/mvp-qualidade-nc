import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import { getUserByEmail } from './admin/user/actions'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dataUser = (await getUserByEmail('pedro.doe@email.com')) || undefined

  console.log('dataUser', dataUser)

  // if (!dataUser) {
  //   return redirect('/')
  // }
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'false'
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col space-y-4 pr-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
