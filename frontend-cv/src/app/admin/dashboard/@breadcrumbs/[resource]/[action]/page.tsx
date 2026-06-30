import MiddleText from "@/components/text/MiddleText";
import { Action, Resource } from "@/variables/admin/resource";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { adminVariables } from "@/variables/admin/resource";
import Link from "next/link";

type Props = {
    params: Promise<{ resource: Resource, action: Action }>
}




export default async function Page({ params }: Props) {
    const resource = (await params).resource;
    const action = (await params).action;
    return (
        <div className="flex gap-2 text-adminGr0 transition-all duration-700">
            <Link className="flex gap-2 hover:text-adminTx underline transition-all duration-700" href={adminVariables.pathAdminPage}>
            <HomeIcon />
            <MiddleText>
                {adminVariables.dashBoard}
            </MiddleText>
            </Link>
            /
            <Link className="flex gap-2 hover:text-adminTx underline transition-all duration-700" href={adminVariables.pathAdminPage + '/' + resource}>
            <MiddleText tailwind="capitalize">
                {resource}
            </MiddleText>
            </Link>
            /
            <MiddleText tailwind="capitalize">
                {action}
                {action === Action.CREATE.toLowerCase() && <AddIcon />}
                {action === Action.UPDATE.toLowerCase() && <EditIcon />}
                {action === Action.DELETE.toLowerCase() && <DeleteIcon />}
                {action === Action.READ.toLowerCase() && <PreviewIcon />}
            </MiddleText>
        </div>
    )
}