import { getRelatorioById } from '@/app/_components/relatorio/actions'
import { PhotoAnalisysType } from '@/lib/types'
import { PlusIcon } from 'lucide-react'
import { DialogServiceDescription } from '../_components/dialogServiceDescription'
import ModalAddCardPhoto from '../_components/modalAddCardPhoto'
import PhotoAnalisys from '../_components/photoAnalisys'
import { RemoveServices } from '../_components/removerServices'
import { getDescriptionsId, getPhotoAnalisysById } from '../actions'

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const photoAnalisys: PhotoAnalisysType[] = await getPhotoAnalisysById(id)
  const relatorioHeader = await getRelatorioById(id)
  const descriptions = await getDescriptionsId(id)

  return (
    <main className="flex flex-col items-center bg-slate-300 w-full">
      <ModalAddCardPhoto
        textButton={<PlusIcon className="w-6 h-6" />}
        textDescription={'Adicione uma nova foto'}
        textTitle={'Adicionar Foto'}
      />
      <header className="flex flex-col bg-white">
        <div className="flex items-center justify-between">
          <div className="w-44 h-20 bg-slate-400"></div>
          <h1 className="text-2xl font-bold px-4">
            RELATÓRIO DE MANUTENÇÃO CORRETIVA
          </h1>
          <div className="w-44 h-20 bg-slate-400"></div>
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
                    {relatorioHeader.endereco.toUpperCase()}
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
                    {relatorioHeader.cidade.toUpperCase()}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.bairro.toUpperCase()}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.numero}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.uf.toUpperCase()}
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
                    {relatorioHeader.tipoSite.toUpperCase()}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.tipoEstrutura.toUpperCase()}
                  </td>
                  <td className="border-x-2 px-2 text-right">
                    {relatorioHeader.tecnico.toUpperCase()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-2 w-4/5">Serviços</th>
                <th className="text-center">OK</th>
                <th className="text-center">NA</th>
              </tr>
            </thead>
            <tbody>
              {descriptions.length > 0 ? (
                descriptions.map((description, index) => (
                  <tr key={index} className="border-2">
                    <td className="border-2 px-2">{description.services}</td>
                    <td className="border-2 text-center">
                      {description.status === 'ok' ? 'X' : ''}
                    </td>
                    <td className="border-2 text-center">
                      {description.status === 'na' ? 'X' : ''}
                    </td>
                    <td className="flex px-2 w-8">
                      <RemoveServices idService={description.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border-2 px-2 h-8"> </td>
                  <td className="border-2 px-2 text-center"></td>
                  <td className="border-2 px-2 text-center"></td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end p-2">
            <DialogServiceDescription
              dialogButton={'Adicionar Serviço'}
              dialogDescription={'Adicione um novo serviço'}
              dialogTitle={'Adicionar Serviço'}
              idReport={id}
            />
          </div>
        </div>
      </header>
      <aside className="flex flex-col items-center container py-4">
        {<PhotoAnalisys photoAnalisys={photoAnalisys} />}
      </aside>
      <footer className="flex flex-col bg-white">
        <div className="flex items-center justify-between">
          <div className="w-44 h-20 bg-slate-400"></div>
          <h1 className="text-2xl font-bold px-4">
            RELATÓRIO DE MANUTENÇÃO CORRETIVA
          </h1>
          <div className="w-44 h-20 bg-slate-400"></div>
        </div>
      </footer>
    </main>
  )
}
