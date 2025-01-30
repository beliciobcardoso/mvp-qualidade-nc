import HeaderPage from "@/components/header-page";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { DialogCheckIn } from "./_components/dialogCheckin";

export default function CheckInPage() {
    return (
        <main>
            <HeaderPage pageName={'Check-in'} />
            <div className="flex items-center justify-end space-y-2 pt-2">
                <DialogCheckIn
                    dialogButton={'Novo Check-in'}
                    dialogTitle={'Check-in'}
                    dialogDescription={'Tela para salvar um novo Check-in'}
                />
            </div>
            <div>
                <DataTable columns={columns} data={dataClient} />
            </div>
        </main>
    );
}