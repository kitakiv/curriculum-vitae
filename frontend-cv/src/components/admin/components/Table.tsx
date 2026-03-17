'use client'
import {
  Resource, resourceConfig
} from "@/variables/admin/resource"
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { GridColDef } from '@mui/x-data-grid';
import Link from "next/link";

interface Props {
  canCreate: boolean,
  canRead: boolean,
  canUpdate: boolean,
  canDelete: boolean,
  resource: Resource,
  columns: GridColDef[],
  rows: object[],
  resouce: Resource,
  paginationModel?: { page: number; pageSize: number; }
}

export default function Table({
  rows,
  canCreate,
  canRead,
  canUpdate,
  canDelete,
  columns,
  resource,
  paginationModel = { page: 0, pageSize: 10 }
}: Props) {
  if (!canRead) return null;
  if (!canUpdate) {
    columns.pop();
  }
  const createResource = resourceConfig[resource].createForm;
  return (
    <>
      {canCreate &&
        <Link href={createResource?.link || ''}>
          <Button variant="contained">{createResource?.title || ''}</Button>
        </Link>
      }
      <Paper sx={{ height: '100%', width: '100%', minHeight: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  )
}
