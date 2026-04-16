'use client'
import {
  Resource
} from "@/variables/admin/resource"
import { DataGrid, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import HelpButtons from "./HelpButtons";


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
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set<GridRowId>([]),
  });

  const [columnModel, setColumnModel] = useState<GridColDef[]>(columns);
  useEffect(() => {
    if (!canUpdate) {
      setColumnModel((prev) => {
        return prev.filter((col) => col.field !== 'edit');
      })
    }
    if (!canDelete) {
      setColumnModel((prev) => {
        return prev.filter((col) => col.field !== 'delete');
      })
    }
  }, [canDelete, canCreate, canUpdate, canRead]);


  if (!canRead) return null;
  return (
    <div className="w-full h-full">
      <HelpButtons canDelete={canDelete} canCreate={canCreate} ids={rowSelectionModel.ids} resource={resource} />
      <Paper sx={{ width: '100%'}}>
        <DataGrid
          className="bg-adminGr100 text-adminTx"
          rows={rows}
          columns={columnModel}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          getRowHeight={() => 'auto'}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
            console.log(newRowSelectionModel);
          }}
          showToolbar
          rowSelectionModel={rowSelectionModel}
          sx={{ border: 0, height: '100%', width: '100%' }}
        />
      </Paper>
    </div>
  )
}
