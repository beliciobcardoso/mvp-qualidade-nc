import {
  getDescriptionsId,
  getPhotoAnalisysById,
  getRelatorioById,
} from '@/app/(dashboard)/relatorio/actions'
import ncLogo from '@/assets/ncLogo.png'
import { PhotoAnalisysType, Relatorio } from '@/lib/types'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { DialogServiceDescription } from '../_components/dialogServiceDescription'
import ModalAddCardPhoto from '../_components/modalAddCardPhoto'
import PhotoAnalisys from '../_components/photoAnalisys'
import { RemoveServices } from '../_components/removerServices'

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const photoAnalisys: PhotoAnalisysType[] = await getPhotoAnalisysById(id)
  const relatorioHeader: Relatorio = await getRelatorioById(id)
  const descriptions = await getDescriptionsId(id)

  return (
    <main className="flex w-full flex-col items-center bg-slate-300">
      <ModalAddCardPhoto
        textButton={<PlusIcon className="h-6 w-6" />}
        textDescription={'Adicione uma nova foto'}
        textTitle={'Adicionar Foto'}
      />
      <header className="flex flex-col bg-white">
        <div className="flex items-center justify-between">
          <div className="h-20 w-44 bg-slate-400">
            <Image src={ncLogo} alt="Logo" width={200} height={200} />
          </div>
          <h1 className="px-4 text-2xl font-bold">
            RELATÓRIO DE MANUTENÇÃO CORRETIVA
          </h1>
          <div className="h-20 w-44 bg-slate-400">
            <Image src={ncLogo} alt="LogoClient" width={200} height={200} />
          </div>
        </div>
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
                    <td className="flex w-8 px-2">
                      <RemoveServices idService={description.id} />
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
      <aside className="container flex flex-col items-center py-4">
        {<PhotoAnalisys photoAnalisys={photoAnalisys} />}
      </aside>
      <footer className="flex flex-col bg-white">
        <div className="flex items-center justify-between">
          <div className="h-20 w-44 bg-slate-400"></div>
          <h1 className="px-4 text-2xl font-bold">
            RELATÓRIO DE MANUTENÇÃO CORRETIVA
          </h1>
          <div className="h-20 w-44 bg-slate-400"></div>
        </div>
      </footer>
    </main>
  )
}
