import HeaderReport from '@/app/(dashboard)/relatorio/_components/headerReport';
import { getDescriptionsId, getPhotoAnalisysById, getRelatorioById } from '@/app/(dashboard)/relatorio/actions';
import Photos from "@/components/teste/Photos";
import { auth } from '@/lib/auth';
import type { PhotoAnalisysType, Relatorio, User } from '@/lib/types';
import { redirect } from 'next/navigation';

export default async function Home({ params }: { params: { id: string } }) {
    const session = await auth()

    const user = session?.user as User
    let dataUser: User | null = null

    if (!session) {
        redirect('/signin')
    } else {
        dataUser = user
    }
    const id = Number.parseInt(params.id)
    const photoAnalisys: PhotoAnalisysType[] = await getPhotoAnalisysById(id)
    const relatorioHeader: Relatorio = await getRelatorioById(id)
    const descriptions = await getDescriptionsId(id)
    return (
        <main>
            <div className="flex w-full flex-col items-center bg-slate-300">
                <HeaderReport
                    relatorioHeader={relatorioHeader}
                    descriptions={descriptions}
                    photoAnalisys={photoAnalisys}
                    id={id}
                    user={dataUser}
                />
                <aside className="container flex flex-col items-center py-4">
                    <Photos />
                </aside>
            </div>
        </main>
    );
}