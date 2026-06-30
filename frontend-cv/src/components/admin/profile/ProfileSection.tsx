'use client'
import {
    Action, Resource,
    resourceConfig
} from "@/variables/admin/resource"
import { GetProfileQuery, GetUserMutation } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions"
import Table from "@/components/admin/components/Table";
interface Props {
    user: GetUserMutation['getUser'],
    rows: GetProfileQuery['profile'],
}

export default function ProfileSection({ user, rows }: Props) {
    const resource = Resource.PROFILE;
    const canRead = hasPermission(user, resource, [Action.READ]);
    const canCreate = false;
    const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
    const canDelete = false;
    const columns = resourceConfig[Resource.PROFILE].table.table.columns;
    return (
        <>
            <Table
                canCreate={canCreate}
                canRead={canRead}
                canUpdate={canUpdate}
                resource={resource}
                rows={[rows]}
                columns={columns}
                resouce={Resource.SLIDER}
                canDelete={canDelete}
            />
        </>
    )
}
