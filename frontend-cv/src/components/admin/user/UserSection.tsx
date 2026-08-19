'use client'
import {
    Action, Resource,
    resourceConfig
} from "@/variables/admin/resource"
import { GetUserMutation, GetUsersQuery } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions"
import Table from "@/components/admin/components/Table";
interface Props {
    user: GetUserMutation['getUser'],
    rows: GetUsersQuery['users']
}

export default function UserSection({ user, rows}: Props) {
    const resource = Resource.USER;
    const canRead = hasPermission(user, resource, [Action.READ]);
    const canCreate = false;
    const canUpdate = hasPermission(user, resource, [Action.UPDATE]) && hasPermission(user, Resource.ROLE, [Action.READ]);
    const canDelete = hasPermission(user, resource, [Action.DELETE]);
    const columns = resourceConfig[Resource.USER].table.table.columns;
    return (
        <>
            <Table
                canCreate={canCreate}
                canRead={canRead}
                canUpdate={canUpdate}
                resource={Resource.USER}
                rows={rows}
                columns={columns}
                canDelete={canDelete}
            />
        </>
    )
}
