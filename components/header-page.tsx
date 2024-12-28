import { Separator } from '@/components/ui/separator'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from './ui/breadcrumb'
import { SidebarTrigger } from './ui/sidebar'

interface HeaderPageProps {
  pageName?: string
}

export default function HeaderPage({ pageName }: HeaderPageProps) {
  return (
    <header className="sticky top-0 flex h-[68px] shrink-0 border-b bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[53px]">
      <div className="flex items-center gap-2 px-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <h1 className="text-3xl font-bold tracking-tight text-black">
                {pageName}
              </h1>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
