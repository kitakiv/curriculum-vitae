'use client'
import {
    Action, Resource,
    resourceConfig
} from "@/variables/admin/resource"
import { GetRolesQuery, GetUserMutation } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions"
import Table from "@/components/admin/components/Table";
interface Props {
    user: GetUserMutation['getUser'],
    rows: GetRolesQuery['roles']
}

export default function RoleSection({ user, rows }: Props) {
    const resource = Resource.ROLE;
    const canRead = hasPermission(user, resource, [Action.READ]);
    const canCreate = hasPermission(user, resource, [Action.CREATE]);
    const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
    const canDelete = hasPermission(user, resource, [Action.DELETE]);
    const columns = resourceConfig[Resource.ROLE].table.table.columns;

    return (
        <>
            <Table
                canCreate={canCreate}
                canRead={canRead}
                canUpdate={canUpdate}
                resource={resource}
                rows={rows}
                columns={columns}
                resouce={Resource.PROJECT}
                canDelete={canDelete}
            />
        </>
    )
}
