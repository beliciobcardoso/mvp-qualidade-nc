'use client'

import * as React from 'react'

import LogoNC from '@/assets/logo.png'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  BriefcaseBusiness,
  ChartSpline,
  ExpandIcon,
  IdCard,
  LandPlotIcon,
  NotepadTextIcon,
  RadioTower,
  UserRoundPlus,
  WrenchIcon,
} from 'lucide-react'
import Image from 'next/image'
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
    <Sidebar
      collapsible="icon"
      {...props}
      className="mr-0 bg-sidebar-primary lg:w-[20%] xl:w-[17%] 2xl:w-[13%]"
    >
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <a href="/" className="flex h-12 gap-2 p-0">
            <div className="flex aspect-square items-center justify-center">
              <Image src={LogoNC} alt="Logo" width={32} height={32} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Nova Corrente</span>
              <span className="truncate text-xs">Enterprise</span>
            </div>
          </a>
        </SidebarMenuButton>
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
