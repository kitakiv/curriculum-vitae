import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import { adminVariables, Resource } from "@/variables/admin/resource";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface Props {
    params: {
        row: {
            id: string
        }
    },
    resource: Resource
}
export function EditAdminButton({ params, resource }: Props) {
    return (
        <Link title="Edit" href={`${adminVariables.pathAdminPage}/${resource}/${adminVariables.edit.path}/${params.row.id}`}>
            <IconButton aria-label="edit" color="primary">
                <EditIcon />
            </IconButton>
        </Link>
    )
}

export function DeleteAdminButton({ params, resource }: Props) {
    return (
        <Link title={adminVariables.delete.title} href={`${adminVariables.pathAdminPage}/${resource}/${adminVariables.delete.path}/${params.row.id}`}>
            <IconButton aria-label="delete" color="error">
                <DeleteIcon />
            </IconButton>
        </Link>
    )
}

export function ViewAdminButton({ params, resource }: Props) {
    return (
        <Link title={adminVariables.view.title} href={`${adminVariables.pathAdminPage}/${resource}/${adminVariables.view.path}/${params.row.id}`}>
            <IconButton color="primary">
                <PreviewIcon />
            </IconButton >
        </Link>
    )
}

export function AttachRoleAdminButton({ params, resource }: Props) {
    return (
        <Link title={adminVariables.attachRole.title} href={`${adminVariables.pathAdminPage}/${resource}/${adminVariables.attachRole.path}/${params.row.id}`}>
            <IconButton color="primary">
                <PersonAddIcon />
            </IconButton >
        </Link>
    )
}