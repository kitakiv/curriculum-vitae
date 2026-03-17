import ResourceSection from "@/components/admin/components/ResourceSection";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import { Resource } from "@/variables/admin/resource";


type Props = {
    params: Promise<{ resource: Resource }>
}

export default async function Page({params}: Props) {
    const resource = (await params).resource
   const user: GetUserMutation['getUser'] | false = await getMe() as GetUserMutation['getUser'];
    return (
            <ResourceSection user={user} currentResource={resource} />
    );
}