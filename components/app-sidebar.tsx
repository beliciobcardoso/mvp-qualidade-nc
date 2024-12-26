'use client'
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
import type { User } from '@/lib/types'
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
import type * as React from 'react'
import { NavAdm } from './nav-adm'
import { NavMain } from './nav-main'
import { Separator } from './ui/separator'

const data = {
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userData: User
}

export function AppSidebar({ userData, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props} className="mr-0 bg-sidebar-primary lg:w-[20%] xl:w-[17%] 2xl:w-[13%]">
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
        {/* {userData.role === 'ADMIN' && <NavAdm items={data.navAdm} />} */}
        {<NavAdm items={data.navAdm} dataUser={userData} />}
      </SidebarContent>
      <Separator className="my-1" />
      <SidebarFooter>
        <NavUser {...userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
