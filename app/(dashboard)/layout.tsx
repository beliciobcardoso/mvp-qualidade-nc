import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
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

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col space-y-4 pr-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
