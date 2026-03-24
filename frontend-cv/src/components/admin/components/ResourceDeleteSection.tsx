"use client";
import { Resource } from "@/variables/admin/resource";
import { Slider, Contact, Certificate } from "@/gql/graphql";
import DeleteFormSlider from "@/components/admin/slider/DeleteFormSlider";
import DeleteFormContact from "@/components/admin/contact/DeleteFormContact";
import DeleteFormCertificate from "../certificates/DeleteFormCertificate";
interface ResourceSectionProps<R> {
    currentResource: Resource;
    resourceId: string;
    resource: R;
}

export default function ResourceDeleteSection<R>({currentResource, resourceId, resource}: ResourceSectionProps<R>) {
    switch (currentResource) {
       case Resource.CONTACT:
            const contact = resource as Contact;
            return (
                <>
                    <DeleteFormContact resource={contact} resourceId={resourceId} />
                </>
            )
        case Resource.SLIDER:
            const slider = resource as Slider;
            return (
                <>
                    <DeleteFormSlider resource={slider} resourceId={resourceId} />
                </>
            )
        case Resource.CERTIFICATE:
            const certificate = resource as Certificate;
            return (
                <>
                   <DeleteFormCertificate resource={certificate} resourceId={resourceId} />
                </>
            )
        default:
            return null; 
    }
}