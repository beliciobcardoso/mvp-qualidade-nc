import { getRelatorioById } from '@/app/_components/relatorio/actions'
import { PhotoAnalisys } from '@/lib/types'
import ServiceDescriptionForm from '../_components/service-description-form'
import { getPhotoAnalisysById } from '../actions'

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const photoAnalisys: PhotoAnalisys[] = await getPhotoAnalisysById(id)
  const relatorioHeader = await getRelatorioById(id)

  return (
    <main className="flex flex-col items-center bg-slate-300 w-full">
      <header className="flex flex-col bg-white">
        <div className="flex items-center justify-between">
          <div className="w-44 h-44 bg-slate-400"></div>
          <h1 className="text-2xl font-bold px-4">
            RELATÓRIO DE MANUTENÇÃO CORRETIVA
          </h1>
          <div className="w-44 h-44 bg-slate-400"></div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg text-center font-bold bg-blue-500 text-white p-2">
            DADOS DO SITE
          </h1>
          <div>
            <table className="w-full border-2 text-left">
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
                    {relatorioHeader.idSite}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.endereco}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.altura}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.dataServico.toLocaleDateString()}
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
                    {relatorioHeader.cidade}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.bairro}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.numero}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.uf}
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
                    {relatorioHeader.tipoSite}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.tipoEstrutura}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.tecnico}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ServiceDescriptionForm id={id} />
        </div>
      </header>
      <aside className="bg-blue-500 w-full flex flex-col items-center">
        <div>
          {photoAnalisys.length > 0 ? (
            photoAnalisys.map((item) => (
              <div key={item.id}>
                <h2>{item.url}</h2>
                <p>{item.name}</p>
              </div>
            ))
          ) : (
            <p>Não há dados para exibir</p>
          )}
        </div>
      </aside>
    </main>
  )
}
