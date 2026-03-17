import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import { adminVariables, Resource } from "@/variables/admin/resource"

interface Props {
    params: {
        row: {
            id: string
        }
    },
    resource: Resource
}
export default function EditAdminButton({ params, resource }: Props) {
    return (
        <Link href={`${adminVariables.pathAdminPage}/${resource}/${adminVariables.pathAdminEdit}/${params.row.id}`}>
            <Button variant="contained" color="primary">
                Edit
            </Button>
        </Link>
    )
}