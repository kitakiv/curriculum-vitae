import ResourceCreateSection from "@/components/admin/components/ResourceCreateSection";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import {Resource, Action} from "@/variables/admin/resource";

type Props = {
    params: Promise<{ resource: Resource, action: string }>
}
export default async function Page({ params }: Props) {
    const user = await getMe() as GetUserMutation['getUser'];
    const currentResource = (await params).resource;
    const action = (await params).action;

    if (action === Action.CREATE) return <ResourceCreateSection user={user} currentResource={currentResource} />
}