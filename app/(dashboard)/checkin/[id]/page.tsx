import { getAllProvider } from "@/app/(dashboard)/admin/provider/actions"
import HeaderPage from "@/components/header-page"
import { auth } from '@/lib/auth'
import type { User } from "@/lib/types"
import { redirect } from "next/navigation"
import HeaderCheckin from "../_components/headerCheckin"
import PhotoAnalisys from "../_components/photoAnalisys"
import { getCheckInById, getPhotoCheckInById } from "../actions"

export default async function CheckinPage({ params }: { params: { id: string } }) {
    const session = await auth()

    const user = session?.user as User
    let dataUser: User | null = null

    if (!session) {
        redirect('/signin')
    } else {
        dataUser = user
    }

    const id = Number.parseInt(params.id)
    const providerData = (await getAllProvider()) || []
    const checkinData = (await getCheckInById(id))
    const photoData = (await getPhotoCheckInById(id))
    return (
        <main>
            <HeaderPage pageName={`Check-in - ${id}`} />
            <div className="flex w-full flex-col items-center bg-slate-300">
                <HeaderCheckin user={dataUser} providerProps={providerData} checkinProps={checkinData} />
                <aside className="container flex flex-col items-center py-4">
                    <PhotoAnalisys photoAnalisys={photoData} />
                </aside>
            </div>
        </main>
    )
}