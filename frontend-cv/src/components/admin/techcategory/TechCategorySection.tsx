'use client'
import {
    Action, Resource,
    resourceConfig
} from "@/variables/admin/resource"
import {  GetTechCategoriesQuery, GetUserMutation } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions"
import Table from "@/components/admin/components/Table";
interface Props {
    user: GetUserMutation['getUser'],
    rows: GetTechCategoriesQuery['techCategories']
}

export default function TechCategorySection({ user, rows }: Props) {
    const resource = Resource.CATEGORY;
    const canRead = hasPermission(user, resource, [Action.READ]);
    const canCreate = hasPermission(user, resource, [Action.CREATE]);
    const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
    const canDelete = hasPermission(user, resource, [Action.DELETE]);
    const columns = resourceConfig[Resource.CATEGORY].table.table.columns;
    return (
        <>
            <Table
                canCreate={canCreate}
                canRead={canRead}
                canUpdate={canUpdate}
                resource={Resource.CATEGORY}
                rows={rows}
                columns={columns}
                canDelete={canDelete}
            />
        </>
    )
}
