'use client';
import { GetUserMutation } from "@/gql/graphql";
import { hasPermission } from "@/query/permissions";
import { Action, Resource} from "@/variables/admin/resource";
import CreateFormContact from "../contact/CreateFormContact";
import CreateFormSlider from "../slider/CreateFormSlider";


export default function ResourceCreateSection({user, currentResource}: {user: GetUserMutation['getUser'], currentResource: Resource}) {
    const canCreate = hasPermission(user, currentResource, [Action.CREATE]);
    if (!canCreate) return null;
    switch (currentResource) {
       case Resource.CONTACT:
            return <CreateFormContact />
        case Resource.SLIDER:
            return <CreateFormSlider />
        default:
            return null; 
    }
}


