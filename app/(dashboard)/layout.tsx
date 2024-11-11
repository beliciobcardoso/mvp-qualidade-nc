import { NavMenu } from '@/components/nav-menu'
import { UserNav } from '@/components/nav-user'
import { Separator } from '@/components/ui/separator'
import { User } from '@/lib/types'
import { Command } from 'lucide-react'

export const dataUser = {
  user: {
    id: 'cd1b1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
    name: 'Fulano de Tal',
    email: 'fulano.tal@email.com',
    avatar: '/avatars/shadcn.jpg',
    role: 'ADMIN',
  } as User,
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="flex h-screen">
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
        <footer className="flex flex-grow-0 items-center bg-slate-300 py-2 pl-2">
          <UserNav {...dataUser.user} />
        </footer>
      </aside>
      <main className="flex w-[86%] flex-col overflow-scroll bg-[#F7F8FA] md:w-[92%] lg:w-[84%] xl:w-[86%]">
        {children}
      </main>
    </section>
  )
}
