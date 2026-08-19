import ResourceUpdateSection from "@/components/admin/components/ResourceUpdateSection";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import { hasPermission } from "@/query/permissions";
import { getEditInitialValues, getResourceById, getResouseInputsEdit } from "@/query/query";
import {Action, Resource } from "@/variables/admin/resource";
import ResourceDeleteSection from "@/components/admin/components/ResourceDeleteSection";
import { InputType } from "@/types/index";
import LoadingForm from "@/components/loader/LoadingForm";


type Props = {
    params: Promise<{ resource: Resource, action: Action, resourceId: string }>
}
export default async function Page({ params }: Props) {
    const user = await getMe() as GetUserMutation['getUser'];
    const currentResource = (await params).resource;
    const resourceId = (await params).resourceId;
    const action = (await params).action;
    
    if (action === Action.UPDATE) {
        const canUpdate = hasPermission(user, currentResource, [Action.UPDATE]);
        if (!canUpdate) return <div>Access Denied</div>
        const resource = await getResourceById(currentResource, resourceId);
        if (!resource) return <div>Resource not found</div>;
        const inputs = await getResouseInputsEdit(currentResource);
        const initialValues = await getEditInitialValues(currentResource, resource);
        return (
            <ResourceUpdateSection<typeof resource> resource={resource} resourceId={resourceId} currentResource={currentResource}  inputs={inputs as InputType[] | null} initialValues={initialValues} />
        )
    }
    if (action === Action.DELETE) {
        const canDelete = hasPermission(user, currentResource, [Action.DELETE]);
        if (!canDelete) return <div>Access Denied</div>
        const resource = await getResourceById(currentResource, resourceId);
        return (
            <ResourceDeleteSection<typeof resource> resource={resource} resourceId={resourceId} currentResource={currentResource} />
        )
    }
    return null
}
