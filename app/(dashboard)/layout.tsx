import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getUserByEmail } from './admin/user/actions'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dataUser = (await getUserByEmail('pedro.doe@email.com')) || undefined

  if (!dataUser) {
    return <div>Loading...</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

/* <section className="flex h-screen">
<aside className="flex h-screen w-[14%] flex-col p-2 md:w-[8%] lg:w-[16%] xl:w-[14%]">
  <header className="flex flex-grow-0 items-center py-2 pl-2">
    <a href="/" className="flex gap-2 p-0">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Command className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Nova Corrente</span>
        <span className="truncate text-xs">Enterprise</span>
      </div>
    </a>
  </header>
  <Separator className="my-1" />
  <nav className="flex-grow p-2">
    <NavMenu />
  </nav>
  <Separator className="my-1" />
  <footer className="flex flex-grow-0 items-center rounded-sm bg-slate-300 py-2 pl-2">
    <NavUser {...dataUser} />
  </footer>
</aside>
<main className="flex w-[86%] flex-col overflow-scroll bg-[#F7F8FA] md:w-[92%] lg:w-[84%] xl:w-[86%]">
  {children}
</main>
</section> */
