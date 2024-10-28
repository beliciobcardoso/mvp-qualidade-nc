'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
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
import Link from 'next/link'

const cadastros = [
  {
    icon: <BriefcaseBusiness className="size-4" />,
    label: 'Clientes',
    href: '/admin/client',
  },
  {
    icon: <WrenchIcon className="size-4" />,
    label: 'Técnicos',
    href: '/admin/technician',
  },
  {
    icon: <RadioTower className="size-4" />,
    label: 'Tipos de Estruturas',
    href: '/admin/structureType',
  },
  {
    icon: <ExpandIcon className="size-4" />,
    label: 'Tipos de Sites',
    href: '/admin/siteType',
  },
  {
    icon: <LandPlotIcon className="size-4" />,
    label: 'Sites',
    href: '/admin/site',
  },
  {
    icon: <UserRoundPlus className="size-4" />,
    label: 'Usuários',
    href: '/admin/user',
  },
]

const data = {
  menu: {
    items: [
      {
        icon: <ChartSpline className="size-4" />,
        label: 'Dashboard',
        href: '/',
      },
      {
        icon: <NotepadTextIcon className="size-4" />,
        label: 'Relatórios',
        href: '/relatorio',
      },
    ],
  },
}

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col items-start space-x-0 gap-2">
        {data.menu.items.map((item, index) => (
          <NavigationMenuItem key={index}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `flex text-xs p-2 font-semibold uppercase gap-2`,
                )}
              >
                {item.icon}
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <IdCard className="size-4" />
            CADASTROS
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-2 p-2 flex flex-col w-[190px]">
              {cadastros.map((cadastro) => (
                <li key={cadastro.label}>
                  <Link href={cadastro.href} passHref>
                    <NavigationMenuLink className="flex items-center gap-2 p-2 font-semibold uppercase text-xs">
                      {cadastro.icon}
                      {cadastro.label}
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
