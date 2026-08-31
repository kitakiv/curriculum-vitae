import ResourceCreateSection from "@/components/admin/components/ResourceCreateSection";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import { hasPermission } from "@/query/permissions";
import {getInitialValues, getInputsValues } from "@/query/query";
import { Resource, Action } from "@/variables/admin/resource";
import { InputType } from "@/types/index";
import ResourceDeleteManySection from "@/components/admin/components/ResourceDeleteManySection";
import TextWhite from "@/components/text/TextWhite";
import { adminVariables }from "@/variables/admin/resource";
import ErrorMessage from "@/components/admin/components/ErrorMessage";

type Props = {
    params: Promise<{ resource: Resource, action: string }>
}
export default async function Page({ params }: Props) {
    const user = await getMe() as GetUserMutation['getUser'];
    const currentResource = (await params).resource;
    const action = (await params).action;
    // create action
    if (action === Action.CREATE) {
        const canCreate = user ? hasPermission(user, currentResource, [Action.CREATE]) : false;
        if (!canCreate) return <TextWhite>{adminVariables.denied}</TextWhite>
        const inputsAdd = await getInputsValues(currentResource);
        const initalValues = await getInitialValues(currentResource);
        return <ResourceCreateSection user={user} currentResource={currentResource} inputs={inputsAdd as InputType[] | null} initalValues={initalValues} />
    }

    if (action === Action.DELETEMANY) {
        const canDelete = user ? hasPermission(user, currentResource, [Action.DELETE]) : false;
        if (!canDelete) return <TextWhite>{adminVariables.denied}</TextWhite>
        return <ResourceDeleteManySection currentResource={currentResource} />
    }


    // no acitons
    return <ErrorMessage>{adminVariables.invalidAction}</ErrorMessage>
}