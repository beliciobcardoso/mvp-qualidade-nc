import { getRelatorioById } from '@/app/_components/relatorio/actions'
import { PhotoAnalisys } from '@/lib/types'
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
          <h1 className="text-center bg-blue-600 font-bold">DADOS DO SITE</h1>
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
          <h1 className="text-center bg-blue-600 font-bold">
            DESCRIÇÃO DOS SERVIÇOS REALIZADOS
          </h1>
          <form action="" className="px-2 bg-slate-400">
            <div className="w-full">
              <div className="flex w-[1f,250px,250px]">
                <label htmlFor="SERVIÇOS REALIZADOS">
                  SERVIÇOS REALIZADOS:
                </label>
                <label htmlFor="ok">OK</label>
                <label htmlFor="na">N/A</label>
              </div>
              <div className="">
                <input
                  type="text"
                  name="linha1"
                  id="linha1"
                  className="border-2 border-black w-full"
                  placeholder="Digite os serviços realizados"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <input
                  type="checkbox"
                  name="ok1"
                  id="ok1"
                  className="h-7 w-7"
                  title="OK1"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <input
                  type="checkbox"
                  name="na1"
                  id="na1"
                  className="h-7 w-7"
                  title="na1"
                />
              </div>
            </div>
          </form>
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
