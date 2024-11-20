'use client'

import * as React from 'react'

import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  BriefcaseBusiness,
  ChartSpline,
  Command,
  ExpandIcon,
  IdCard,
  LandPlotIcon,
  NotepadTextIcon,
  RadioTower,
  UserRoundPlus,
  WrenchIcon,
} from 'lucide-react'
import { NavAdm } from './nav-adm'
import { NavMain } from './nav-main'
import { Separator } from './ui/separator'

const data = {
  user: {
    id: '1',
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
    role: 'ADMIN' as const,
  },
  menuMain: [
    {
      name: 'Dashboard',
      url: '/',
      icon: ChartSpline,
    },
    {
      name: 'Relatórios',
      url: '/relatorio',
      icon: NotepadTextIcon,
    },
  ],
  navAdm: [
    {
      title: 'CADASTROS',
      url: '#',
      icon: IdCard,
      isActive: false,
      items: [
        {
          title: 'Usuários',
          icon: UserRoundPlus,
          url: '/admin/user',
        },
        {
          title: 'Clientes',
          icon: BriefcaseBusiness,
          url: '/admin/client',
        },
        {
          title: 'Técnicos',
          icon: WrenchIcon,
          url: '/admin/technician',
        },
        {
          title: 'Tipos de Sites',
          icon: ExpandIcon,
          url: '/admin/siteType',
        },
        {
          title: 'Tipos de Estruturas',
          icon: RadioTower,
          url: '/admin/structureType',
        },
        {
          title: 'Sites',
          icon: LandPlotIcon,
          url: '/admin/site',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="mr-0 w-[17%]">
      <SidebarHeader>
        <a href="/" className="flex gap-2 p-0">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Nova Corrente</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </a>
      </SidebarHeader>
      <Separator className="my-1" />
      <SidebarContent>
        <NavMain menuMain={data.menuMain} />
        <NavAdm items={data.navAdm} />
      </SidebarContent>
      <Separator className="my-1" />
      <SidebarFooter>
        <NavUser {...data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
