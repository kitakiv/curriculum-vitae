import { getMe } from "@/query/auth.query"
import Sidebar from "@/components/admin/components/Sidebar";
import { GetUserMutation } from "@/gql/graphql";
import MenuLoader from "@/components/loader/MenuLoader";

interface Props {
    params: Promise<{ resource: string }>
}

export default async function Page({params}: Props) {
    const currentResource = (await params).resource;
    try {
        const user: GetUserMutation['getUser'] = await getMe() as GetUserMutation['getUser'];
        return (
            <Sidebar user={user} currentResource={currentResource} />
        )
    } catch (_) {
        return null
    }

}