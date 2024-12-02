import HeaderReportSite from '@/app/(dashboard)/relatorio/_components/headerReportSite'
import ncLogo from '@/assets/ncLogo.png'
import { PhotoAnalisysType, Relatorio } from '@/lib/types'
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

export default function HeaderReport({
  relatorioHeader,
  descriptions,
}: RelatorioHeaderProps) {
  return (
    <header className="flex w-[780px] flex-col bg-white">
      <div className="flex items-center justify-between">
        <div className="h-20 w-44">
          <Image
            src={ncLogo}
            alt="Logo"
            width={400}
            height={400}
            className="h-full w-full"
          />
        </div>
        <h1 className="px-4 text-lg font-bold">
          RELATÓRIO DE MANUTENÇÃO CORRETIVA
        </h1>
        <div className="h-20 w-44">
          <Image
            src={relatorioHeader.sites.client.img ?? ncLogo}
            alt="LogoClient"
            width={800}
            height={800}
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
            {descriptions.length > 0 ? (
              descriptions.map((description, index) => (
                <tr key={index} className="border-2">
                  <td className="border-2 px-2">{description.service}</td>
                  <td className="border-2 text-center">
                    {description.status === 'ok' ? 'X' : ''}
                  </td>
                  <td className="border-2 text-center">
                    {description.status === 'na' ? 'X' : ''}
                  </td>
                  <td className="flex items-center justify-center">
                    {/* {descriptions.length === 1 ? (
                      <p className="cursor-pointer rounded-sm bg-destructive bg-red-300 p-2 text-destructive-foreground text-white shadow-sm hover:bg-destructive/90">
                        Del
                      </p>
                    ) : (
                      <RemoveServices idService={description.id} />
                    )} */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="h-8 border-2 px-2"> </td>
                <td className="border-2 px-2 text-center"></td>
                <td className="border-2 px-2 text-center"></td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="flex justify-end gap-2 p-2">
          <GeneratePdf
            dialogButton={'Gerar PDF'}
            dialogTitle={'Gerar PDF'}
            dialogDescription={'Tela para gerar um PDF'}
            idReport={id}
          />
          {photoAnalisys.length > 4 ? (
            <AproveReport
              dialogButton={'Finalizar Relatório'}
              dialogTitle={'Finalizar Relatório'}
              dialogDescription={'Tela para finalizar um relatório'}
              idReport={id}
            />
          ) : (
            ''
          )}
          <DialogServiceDescription
            dialogButton={'Adicionar Serviço'}
            dialogDescription={'Adicione um novo serviço'}
            dialogTitle={'Adicionar Serviço'}
            idReport={id}
          />
          {descriptions.length > 0 ? (
            <ModalAddCardPhoto
              textButton={<PlusIcon className="h-6 w-6" />}
              textDescription={'Adicione uma nova foto'}
              textTitle={'Adicionar Foto'}
            />
          ) : (
            ''
          )}
        </div> */}
      </div>
    </header>
  )
}
