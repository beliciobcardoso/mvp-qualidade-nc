'use client'
import type { ColumnDef } from '@tanstack/react-table'

import type { ClientType, SiteTypeRel, TipoSiteType } from '@/lib/types'
import type { StructureType } from '@prisma/client'

import { useEffect, useState } from 'react'
import { getAllClient } from '../../client/actions'
import { getAllSitesType } from '../../siteType/actions'
import { getAllStructuresType } from '../../structureType/actions'
import { DialogUserUpdate } from './dialogSiteUpdate'

export const columns: ColumnDef<SiteTypeRel>[] = [
  {
    accessorKey: 'idSite',
    id: 'Site ID',
    header: 'Site ID',
  },
  {
    accessorKey: 'client.name',
    id: 'Cliente',
    header: 'Cliente',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.client.name}</div>
    },
  },
  {
    accessorKey: 'siteType.name',
    id: 'Tipo de Site',
    header: 'Tipo de Site',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.siteType.name}</div>
    },
  },
  {
    accessorKey: 'structureType.name',
    id: 'Tipo de Estrutura',
    header: 'Tipo de Estrutura',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.structureType.name}</div>
    },
  },
  {
    accessorKey: 'cidade',
    id: 'Cidade',
    header: 'Cidade',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.cidade}</div>
    },
  },
  {
    accessorKey: 'uf',
    id: 'Estado',
    header: 'Estado',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.uf}</div>
    },
  },
  {
    accessorKey: 'editSite',
    header: '',
    enableHiding: false,
    cell: ({ row }) => {
      return <EditSiteCell row={row} />
    },
  },
]

const EditSiteCell: React.FC<{ row: { original: SiteTypeRel } }> = ({ row }) => {
  const data = row.original
  const [clientData, setClientData] = useState<ClientType[]>([])
  const [siteTypeData, setSiteTypeData] = useState<TipoSiteType[]>([])
  const [structureTypeData, setStructureTypeData] = useState<StructureType[]>([])

  useEffect(() => {
    const fetchStructureData = async () => {
      const data = await getAllStructuresType()
      if (data) {
        setStructureTypeData(data)
      }
    }
    const fetchSiteTypeData = async () => {
      const data = await getAllSitesType()
      if (data) {
        setSiteTypeData(data)
      }
    }
    const fetchClientData = async () => {
      const data = await getAllClient()
      if (data) {
        setClientData(data)
      }
    }
    fetchClientData()
    fetchSiteTypeData()
    fetchStructureData()
  }, [])

  return (
    <DialogUserUpdate
      dialogButton={'Editar'}
      dialogTitle={'Site'}
      dialogDescription={'Tela para Editar Site'}
      dialogData={data}
      clientData={clientData}
      siteTypeData={siteTypeData}
      structureData={structureTypeData}
    />
  )
}
