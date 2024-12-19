import { Dashboard } from "@/components/dashboard";
import HeaderPage from "@/components/header-page";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserRoleCount } from "./admin/user/actions";
import {
	getTotalReportsCreated,
	getTotalReportsFinished,
	getTotalReportsInProgress,
} from "./relatorio/actions";

export default async function Home() {
	const session = await auth();
	if (!session) {
		return redirect("/signin");
	}
	const totalReports = {
		created: await getTotalReportsCreated(),
		inProgress: await getTotalReportsInProgress(),
		finished: await getTotalReportsFinished(),
		analyst: await getUserRoleCount("ANALYST"),
	};

	return (
		<main>
			<HeaderPage pageName={"Dashboard"} />
			<Dashboard DataReports={totalReports} />
		</main>
	);
}
