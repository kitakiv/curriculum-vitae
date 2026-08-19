import { getMe } from "@/query/auth.query"
import Sidebar from "@/components/admin/components/Sidebar";
import { GetUserMutation } from "@/gql/graphql";
import MenuLoader from "@/components/loader/MenuLoader";

export default async function Default() {
    try {
        const user: GetUserMutation['getUser'] = await getMe() as GetUserMutation['getUser'];
        return (
            <Sidebar user={user} />
        )
    } catch (_) {
        return null
    }

}