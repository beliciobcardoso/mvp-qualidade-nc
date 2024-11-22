import { Relatorio } from '@/lib/types'

interface RelatorioHeaderSiteProps {
  relatorioHeader: Relatorio
}

export default function HeaderReportSite({
  relatorioHeader,
}: RelatorioHeaderSiteProps) {
  return (
    <div className="flex flex-col">
      <h1 className="bg-blue-500 p-2 text-center text-lg font-bold text-white">
        DADOS DO SITE
      </h1>
      <div className="text-sm">
        <div>
          <table className="border-1 w-full text-left">
            <tbody>
              <tr>
                <td className="border-x-2 px-2">
                  <span className="font-bold">ORIGINAL ID: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">ENDEREÇO: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">ALTURA: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">DATA DO SERVIÇO: </span>
                </td>
              </tr>
              <tr>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.idSite.toUpperCase()}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.endereco.toUpperCase()}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.altura?.toUpperCase() ?? ''}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.dateService.toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="w-full border-2 text-left">
            <tbody>
              <tr>
                <td className="border-x-2 px-2">
                  <span className="font-bold">CIDADE: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">BAIRRO: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">NÚMERO: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">UF: </span>
                </td>
              </tr>
              <tr>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.cidade.toUpperCase()}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.bairro.toUpperCase()}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.numero.toUpperCase()}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.uf.toUpperCase()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="w-full border-b-2 text-left">
            <tbody>
              <tr>
                <td className="border-x-2 px-2">
                  <span className="font-bold">TIPO DE SITE: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">TIPO DE ESTRUTURA: </span>
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">TÉCNICO: </span>
                </td>
              </tr>
              <tr>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.siteType.name.toUpperCase()}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.sites.structureType.name.toUpperCase()}
                </td>
                <td className="border-x-2 px-2 text-right">
                  {relatorioHeader.technician.name.toUpperCase()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
