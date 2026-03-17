import ResourceUpdateSection from "@/components/admin/components/ResourceUpdateSection";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import { hasPermission } from "@/query/permissions";
import { getResourceById } from "@/query/query";
import {Action, Resource } from "@/variables/admin/resource";
import ResourceCreateSection from "@/components/admin/components/ResourceCreateSection";
// type Props = {
//     params: Promise<{ resource: Resource, resourceId: string }>
// }
// export default async function Page({ params }: Props) {
//     const user = await getMe() as GetUserMutation['getUser'];
//     const {resource: currentResource, resourceId} = (await params);
//     // const canUpdate = hasPermission(user, currentResource, [Action.UPDATE]);
//     // if (!canUpdate) return <div>Access Denied</div>
//     // const resource = await getResourceById(currentResource, resourceId);
//     // if (!resource) return <div>Resource not found</div>;
//     return (
//         <ResourceUpdateSection
//         currentResource={currentResource}
//         resourceId={resourceId}
//         /> 
//     )
// }

type Props = {
    params: Promise<{ resource: Resource, resourceId: string }>
}
export default async function Page({ params }: Props) {
    const user = await getMe() as GetUserMutation['getUser'];
    const currentResource = (await params).resource;
    const resourceId = (await params).resourceId;
    const canUpdate = hasPermission(user, currentResource, [Action.UPDATE]);
    if (!canUpdate) return <div>Access Denied</div>
    const resource = await getResourceById(currentResource, resourceId);
    if (!resource) return <div>Resource not found</div>;
    return (
        <ResourceUpdateSection<typeof resource> resource={resource} resourceId={resourceId} currentResource={currentResource} />
    )
}