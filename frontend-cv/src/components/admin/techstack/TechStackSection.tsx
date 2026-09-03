'use client'
import {
    Action, Resource,
    resourceConfig
} from "@/variables/admin/resource"
import {  GetTechStacksQuery, GetUserMutation } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions"
import Table from "@/components/admin/components/Table";
interface Props {
    user: GetUserMutation['getUser'],
    rows: GetTechStacksQuery['techstacks']
}

export default function TechStackSection({ user, rows }: Props) {
    const resource = Resource.TECHSTACK;
    const canRead = hasPermission(user, resource, [Action.READ]);
    const canCreate = hasPermission(user, resource, [Action.CREATE]);
    const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
    const canDelete = hasPermission(user, resource, [Action.DELETE]);
    const columns = resourceConfig[Resource.TECHSTACK].table.table.columns;
    return (
        <>
            <Table
                canCreate={canCreate}
                canRead={canRead}
                canUpdate={canUpdate}
                resource={Resource.TECHSTACK}
                rows={rows}
                columns={columns}
                canDelete={canDelete}
            />
        </>
    )
}
