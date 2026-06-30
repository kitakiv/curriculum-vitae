'use client'
import {
    Action, Resource,
    resourceConfig
} from "@/variables/admin/resource"
import { GetCertificatesQuery, GetUserMutation } from "@/gql/graphql"
import { hasPermission } from "@/query/permissions";
import Table from "../components/Table";

interface Props {
    user: GetUserMutation['getUser'],
    rows: GetCertificatesQuery['certificates']
}

export default function CertificateSection({ user, rows }: Props) {
    const resource = Resource.CERTIFICATE;
    const canRead = hasPermission(user, resource, [Action.READ]);
    const canCreate = hasPermission(user, resource, [Action.CREATE]);
    const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
    const canDelete = hasPermission(user, resource, [Action.DELETE]);
    const columns = resourceConfig[Resource.CERTIFICATE].table.table.columns;

    return (
       <Table 
       canCreate={canCreate}
       canRead={canRead}
       canUpdate={canUpdate}
       resource={resource}
       rows={rows}
       columns={columns}
       resouce={Resource.CERTIFICATE}
       canDelete={canDelete} />
    )
}


