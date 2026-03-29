'use client';
import { GetUserMutation } from "@/gql/graphql";
import { hasPermission } from "@/query/permissions";
import { Action, Resource} from "@/variables/admin/resource";
import CreateFormContact from "../contact/CreateFormContact";
import CreateFormSlider from "../slider/CreateFormSlider";
import CreateFormCertificate from "../certificates/CreateFormCertificate";
import CreateFormProject from "../projects/CreateFormProject";
import { InputType } from "@/types/index";

interface Props {
    user: GetUserMutation['getUser'];
    currentResource: Resource;
    inputs: InputType[] | null;
}


export default function ResourceCreateSection({user, currentResource, inputs}: Props) {
    const canCreate = hasPermission(user, currentResource, [Action.CREATE]);
    if (!canCreate) return null;
    switch (currentResource) {
       case Resource.CONTACT:
            return <CreateFormContact />
        case Resource.SLIDER:
            return <CreateFormSlider />
        case Resource.CERTIFICATE:
            return <CreateFormCertificate />
        case Resource.PROJECT:
            return <CreateFormProject inputs={inputs} />
        default:
            return null; 
    }
}


