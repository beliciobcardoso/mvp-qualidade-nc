import ncLogo from '@/assets/ncLogo.png'
import type { CheckInType, User } from '@/lib/types'
import type { Provider } from '@prisma/client'
import Image from 'next/image'

interface RelatorioHeaderProps {
  providerProps: Provider[]
  checkinProps: CheckInType | null | undefined
  user: User
}

export default function HeaderCheckin({ providerProps, user }: RelatorioHeaderProps) {
  return (
    <header className="flex flex-col bg-white">
      <div className="flex items-center justify-between w-[900px]">
        <div className="h-20 w-44 ">
          <Image src={ncLogo} alt="Logo" width={400} height={400} className="h-full w-full" />
        </div>
        <div className="flex justify-center items-center h-full w-full">
          <h1 className="text-2xl font-bold uppercase">CHECK IN EHS</h1>
        </div>
      </div>
      <div className='flex flex-col gap-2 p-2 justify-end items-between bg-gray-100 w-full'>
        <div className='flex gap-2 px-2 w-full bg-gray-300'>
          <p className='w-1/2'><strong className='pr-2'>EMPRESA:</strong>LIFETEL</p>
          <p className='w-1/5'><strong className='pr-2'>AUDITOR:</strong>Diellany Reis</p>
        </div>
        <div className='flex gap-2 px-2 w-full bg-gray-300'>
          <p className='w-1/2'><strong className='pr-2'>ATIVIDADE:</strong>INSTALAÇÃO DE TRAVA - QUEDAS</p>
          <p className='w-1/5'><strong className='pr-2'>DATA:</strong>23/10/2024</p>
        </div>
      </div>
      {/* <div>
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
                  <td className="flex items-center justify-center">
                    {descriptions.length === 1 || relatorioHeader.finishedAt ? (
                      <p className="cursor-pointer rounded-sm bg-destructive bg-red-300 p-2 text-destructive-foreground text-white shadow-sm hover:bg-destructive/90">
                        Del
                      </p>
                    ) : (
                      <RemoveServices idService={description.id} />
                    )}
                  </td>
                </tr>
              ))
              : ''}
          </tbody>
        </table>
        <hr />
        <div className="flex justify-end gap-2 p-2">
          {relatorioHeader.finishedAt ? (
            <ReopenReport
              dialogButton={'Reabrir Relatório'}
              dialogTitle={'Reabrir Relatório'}
              dialogDescription={'Tela para reabrir um relatório'}
              idReport={id}
            />
          ) : (
            <> </>
          )}
          {relatorioHeader.finishedAt ? (
            <GeneratePdf
              dialogButton={'Gerar PDF'}
              dialogTitle={'Gerar PDF'}
              dialogDescription={'Tela para gerar um PDF'}
              idReport={id}
            />
          ) : (
            <> </>
          )}
          {photoAnalisys.length > 4 && relatorioHeader.finishedAt === null ? (
            <AproveReport
              dialogButton={'Finalizar Relatório'}
              dialogTitle={'Finalizar Relatório'}
              dialogDescription={'Tela para finalizar um relatório'}
              idReport={id}
            />
          ) : (
            ''
          )}
          {relatorioHeader.finishedAt === null && user ? (
            <DialogServiceDescription
              dialogButton={'Adicionar Serviço'}
              dialogDescription={'Adicione um novo serviço'}
              dialogTitle={'Adicionar Serviço'}
              idReport={id}
              userId={user.id}
              serviceDescription={descriptions}
            />
          ) : (
            ''
          )}
          {descriptions.length > 0 && relatorioHeader.finishedAt === null ? (
            <ModalAddCardPhoto
              textButton={<PlusIcon className="h-6 w-6" />}
              textDescription={'Adicione uma nova foto'}
              textTitle={'Adicionar Foto'}
            />
          ) : (
            ''
          )}
        </div>
      </div> */}
    </header>
  )
}
