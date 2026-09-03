'use client'
import {
    Action, Resource,
    resourceConfig
} from "@/variables/admin/resource"
import { GetProfileQuery, GetProjectsQuery, GetUserMutation } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions"
import Table from "@/components/admin/components/Table";
interface Props {
    user: GetUserMutation['getUser'],
    rows: GetProjectsQuery['projects']
}

export default function ProjectSection({ user, rows }: Props) {
    const resource = Resource.PROJECT;
    const canRead = hasPermission(user, resource, [Action.READ]);
    const canCreate = hasPermission(user, resource, [Action.CREATE]);
    const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
    const canDelete = hasPermission(user, resource, [Action.DELETE]);
    const columns = resourceConfig[Resource.PROJECT].table.table.columns;

    return (
        <>
            <Table
                canCreate={canCreate}
                canRead={canRead}
                canUpdate={canUpdate}
                resource={Resource.PROJECT}
                rows={rows}
                columns={columns}
                canDelete={canDelete}
            />
        </>
    )
}
