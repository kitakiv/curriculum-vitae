import { GetResourcesQuery, GetResourcesQueryVariables, GetUserMutation, Role } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import List from "@/components/admin/components/List";
import { RESOURCES_GET_QUERY } from "@/graphql/role.graphql";
import { queryGraphQL } from "@/query/graphql";



export default async function Admin() {
  const user: GetUserMutation['getUser'] | false = await getMe() as GetUserMutation['getUser'];
  
  const userRole = user?.role || null;
  if (!userRole) return <div>Access Denied</div>;
  const allPermissions: GetResourcesQuery['permissions'] = (await queryGraphQL<GetResourcesQuery, GetResourcesQueryVariables>(RESOURCES_GET_QUERY)).permissions;
  return <List permissions={allPermissions} role={userRole as Role} resourceId={userRole.id}></List>

}