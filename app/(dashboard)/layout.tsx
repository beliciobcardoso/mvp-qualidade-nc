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
    <section className="h-screen flex">
      <aside className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] h-screen flex flex-col p-2">
        <header className="flex items-center pl-2 py-2 flex-grow-0">
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
        <nav className="p-2 flex-grow">
          <NavMenu />
        </nav>
        <Separator className="my-1" />
        <footer className="bg-slate-300 flex items-center pl-2 py-2 flex-grow-0">
          <UserNav {...dataUser.user} />
        </footer>
      </aside>
      <main className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        {children}
      </main>
    </section>
  )
}
