import MiddleText from "@/components/text/MiddleText";
import { Resource } from "@/variables/admin/resource";
import HomeIcon from '@mui/icons-material/Home';
import { adminVariables } from "@/variables/admin/resource";
import Link from "next/link";

type Props = {
    params: Promise<{ resource: Resource, action: string }>
}




export default async function Page({ params }: Props) {
    const resource = (await params).resource
    return (
        <div className="flex gap-2 text-adminGr0">
            <Link className="flex gap-2 hover:text-adminTx underline text-adminGr0 transition-all duration-700" href={adminVariables.pathAdminPage}>
            <HomeIcon />
            <MiddleText>
                {adminVariables.dashBoard}
            </MiddleText>
            </Link>
            /
            <MiddleText tailwind="capitalize">
                {resource}
            </MiddleText>
        </div>
    )
}