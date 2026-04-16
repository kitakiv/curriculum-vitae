import { CreatePermissionInput, GetResourcesQuery, GetResourcesQueryVariables } from "@/gql/graphql";
import { cachedQueryGraphQl } from "./graphql";
import { RESOURCES_GET_QUERY } from "@/graphql/role.graphql";

async function getAllPermissions(): Promise<CreatePermissionInput[]> {
    try {
        const allPermissions =(await cachedQueryGraphQl<GetResourcesQuery, GetResourcesQueryVariables>(RESOURCES_GET_QUERY)).permissions;
        return allPermissions;
    } catch (error) {
        throw error;
    }
}

export { getAllPermissions };