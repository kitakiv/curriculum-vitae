import ResourceCreateSection from "@/components/admin/components/ResourceCreateSection";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import {Resource } from "@/variables/admin/resource";
type Props = {
    params: Promise<{ resource: Resource }>
}
export default async function Page({ params }: Props) {
    const user = await getMe() as GetUserMutation['getUser'];
    const currentResource = (await params).resource
    return (
        <ResourceCreateSection user={user} currentResource={currentResource} />
    )
}