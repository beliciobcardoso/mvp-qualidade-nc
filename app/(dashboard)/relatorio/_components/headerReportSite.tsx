import type { Relatorio } from "@/lib/types";

interface RelatorioHeaderSiteProps {
	relatorioHeader: Relatorio;
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
									{relatorioHeader.sites.idSite.toUpperCase()}
								</td>

<<<<<<< HEAD
                <td className="border-x-2 px-2">
                  <span className="font-bold">ALTURA: </span>
                  {relatorioHeader.sites.altura?.toUpperCase() ?? ''}
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">DATA DO SERVIÇO: </span>
                  {relatorioHeader.dateService.toLocaleDateString("pt-BR")}
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
                  <span className="font-bold">ENDEREÇO: </span>
                  {relatorioHeader.sites.endereco.toUpperCase()}
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">BAIRRO: </span>
                  {relatorioHeader.sites.bairro.toUpperCase()}
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">NÚMERO: </span>
                  {relatorioHeader.sites.numero.toUpperCase()}
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">CIDADE: </span>
                  {relatorioHeader.sites.cidade.toUpperCase()}
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">UF: </span>
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
                  {relatorioHeader.sites.siteType.name.toUpperCase()}
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">TIPO DE ESTRUTURA: </span>
                  {relatorioHeader.sites.structureType.name.toUpperCase()}
                </td>
                <td className="border-x-2 px-2">
                  <span className="font-bold">TÉCNICO: </span>
                  {relatorioHeader.technician.name.toUpperCase()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
=======
								<td className="border-x-2 px-2">
									<span className="font-bold">ALTURA: </span>
									{relatorioHeader.sites.altura?.toUpperCase() ?? ""}
								</td>
								<td className="border-x-2 px-2">
									<span className="font-bold">DATA DO SERVIÇO: </span>
									{relatorioHeader.dateService.toLocaleDateString("pt-BR")}
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
									<span className="font-bold">ENDEREÇO: </span>
									{relatorioHeader.sites.endereco.toUpperCase()}
								</td>
								<td className="border-x-2 px-2">
									<span className="font-bold">BAIRRO: </span>
									{relatorioHeader.sites.bairro.toUpperCase()}
								</td>
								<td className="border-x-2 px-2">
									<span className="font-bold">NÚMERO: </span>
									{relatorioHeader.sites.numero.toUpperCase()}
								</td>
								<td className="border-x-2 px-2">
									<span className="font-bold">CIDADE: </span>
									{relatorioHeader.sites.cidade.toUpperCase()}
								</td>
								<td className="border-x-2 px-2">
									<span className="font-bold">UF: </span>
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
									{relatorioHeader.sites.siteType.name.toUpperCase()}
								</td>
								<td className="border-x-2 px-2">
									<span className="font-bold">TIPO DE ESTRUTURA: </span>
									{relatorioHeader.sites.structureType.name.toUpperCase()}
								</td>
								<td className="border-x-2 px-2">
									<span className="font-bold">TÉCNICO: </span>
									{relatorioHeader.technician.name.toUpperCase()}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
>>>>>>> a6b97fc75763e57653a8d71de3301553acf9f05b
}
