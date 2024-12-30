import HeaderReportSite from '@/app/(dashboard)/relatorio/_components/headerReportSite'
import ncLogo from '@/assets/ncLogo.png'
import type { PhotoAnalisysType, Relatorio } from '@/lib/types'
import Image from 'next/image'

interface RelatorioHeaderProps {
  relatorioHeader: Relatorio
  descriptions: {
    id: number
    idReport: number
    service: string
    status: string
  }[]
  photoAnalisys: PhotoAnalisysType[]
  id: number
}

export default function HeaderReport({ relatorioHeader, descriptions }: RelatorioHeaderProps) {
  return (
    <header className="flex flex-col bg-white">
      <div className="flex items-center justify-between">
        <div className="h-20 w-44">
          <Image src={ncLogo} alt="Logo" width={300} height={300} className="h-full w-full" />
        </div>
        <div className='flex justify-center items-center h-full w-[428px]'>
        <h1 className="text-base font-bold w-full text-center">RELATÓRIO DE MANUTENÇÃO CORRETIVA</h1>
        </div>
        <div className="h-20 w-44">
          <Image
            src={relatorioHeader.sites.client.img ?? ncLogo}
            alt="LogoClient"
            width={300}
            height={300}
            className="h-full w-full"
          />
        </div>
      </div>
      <HeaderReportSite relatorioHeader={relatorioHeader} />
      <div>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="w-4/5 px-2">Serviços</th>
              <th className="text-center">OK</th>
              <th className="text-center">NA</th>
            </tr>
          </thead>
          <tbody>
            {descriptions.length > 0
              ? descriptions.map((description) => (
                <tr key={description.id} className="border-2">
                  <td className="border-2 px-2">{description.service}</td>
                  <td className="border-2 text-center">{description.status === 'ok' ? 'X' : ''}</td>
                  <td className="border-2 text-center">{description.status === 'na' ? 'X' : ''}</td>
                </tr>
              ))
              : ''}
          </tbody>
        </table>
      </div>
    </header>
  )
}
