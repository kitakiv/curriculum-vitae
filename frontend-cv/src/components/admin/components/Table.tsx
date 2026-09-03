'use client'
import {
  Resource
} from "@/variables/admin/resource"
import { DataGrid, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import HelpButtons from "./HelpButtons";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { changeResourceIds } from "@/features/form/FormSlice";
import { FORMS } from "@/features/form/FormSlice";


interface Props {
  canCreate: boolean,
  canRead: boolean,
  canUpdate: boolean,
  canDelete: boolean,
  resource: Resource,
  columns: GridColDef[],
  rows: object[],
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
  const dispatch = useAppDispatch();
  console.log(resource);
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
    <div className="w-full h-auto min-h-screen">
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
            const ids = Array.from(newRowSelectionModel.ids);
            console.log(ids, resource);
            dispatch(changeResourceIds({
              resourceType: resource,
              ids: ids,
              form: FORMS.formDeleteMany
            }));
          }}
          showToolbar
          rowSelectionModel={rowSelectionModel}
          sx={{ border: 0, width: '100%' }}
        />
      </Paper>
    </div>
  )
}
