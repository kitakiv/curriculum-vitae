import { Resource, Action } from "@/variables/admin/resource";
import ResourceDeleteManySection from "@/components/admin/components/ResourceDeleteManySection";
import { getMe } from "@/query/auth.query";
import { GetUserMutation } from "@/gql/graphql";
import { hasPermission } from "@/query/permissions";

type Props = {
    params: Promise<{ resource: Resource}>
}

export default async function Page({ params }: Props) {
    const user = await getMe() as GetUserMutation['getUser'];
    const currentResource = (await params).resource;
    const canDelete = user ? hasPermission(user, currentResource, [Action.DELETE]) : false;
        if (!canDelete) return <div>Access Denied</div>
        return <ResourceDeleteManySection currentResource={currentResource} />
}