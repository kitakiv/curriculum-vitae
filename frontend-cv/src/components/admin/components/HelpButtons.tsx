import { GridRowId } from "@mui/x-data-grid/models";
import { adminVariables } from "@/variables/admin/resource";
import Link from "next/link";
import AdminButton from "@/components/button/AdminButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    canDelete: boolean;
    canCreate: boolean;
    ids: Set<GridRowId>;
    resource: string
}

export default function HelpButtons({
    canDelete,
    canCreate,
    ids,
    resource}: Props) {
    if (!canCreate && !canDelete) return null;
    return (
        <div className="flex gap-4 justify-end w-full bg-adminGr33 rounded-lg px-4 py-2">
            {canCreate &&
                <Link href={`${adminVariables.pathAdminPage}/${resource}/${adminVariables.create.path}/`}>
                  <AdminButton type="button">
                    <AddIcon />
                  {adminVariables.create.title}</AdminButton>
                </Link>
              }
        {canDelete && 
                <Link href={`${adminVariables.pathAdminPage}/${resource}/${adminVariables.deleteMany.path}/`}>
                  <AdminButton disabled={ids.size === 0} type="button">
                    <DeleteIcon />
                    {adminVariables.delete.title}
                  </AdminButton>
                </Link>
                }
            </div>
    )
}