"use client";
import { Resource } from "@/variables/admin/resource";
import UpdateFormContactImage from "@/components/admin/contact/UpdateFormContactImage";
import UpdateFormContact from "@/components/admin/contact/UpdateFormContact";
import UpdateFormSlider from "@/components/admin/slider/UpdateFormSlider";
import UpdateFormSliderImage from "@/components/admin/slider/UpdateFormSliderImage";
import { Contact, Profile, Project, Slider } from "@/gql/graphql";
import UpdateFormCertificate from "../certificates/UpdateFormCertificate";
import { Certificate } from "crypto";
import UpdateFormCertificateImage from "../certificates/UpdateFormCertificateImage";
import UpdateFormProfile from "../profile/UpdateFormProfile";
import UpdateFormProfileImages from "../profile/UpdadteFormProfileImages";
import UpdateFormProfileImage from "../profile/UpdateFormProfileImage";
import UpdateFormProject from "../projects/UpdateFormProject";
import UpdateFormProjectImage from "../projects/UpdateFormProjectImage";
import UpdateFormProjectImages from "../projects/UpdateFormProjectImages";
import { InputType } from "@/types/index";
interface ResourceSectionProps<R> {
    currentResource: Resource;
    resourceId: string;
    resource: R;
    inputs: InputType[] | null
}

export default function ResourceUpdateSection<R>({currentResource, resourceId, resource, inputs}: ResourceSectionProps<R>) {
    switch (currentResource) {
       case Resource.CONTACT:
            return (
                <>
                    <UpdateFormContact initialValues={resource as Contact} resourceId={resourceId}/>
                    <UpdateFormContactImage initialValues={resource as Contact} resourceId={resourceId}/>
                </>
            )
        case Resource.SLIDER:
            return (
                <>
                    <UpdateFormSlider initialValues={resource as Slider} resourceId={resourceId}/>
                    <UpdateFormSliderImage initialValues={resource as Slider} resourceId={resourceId}/>
                </>
            )
        case Resource.CERTIFICATE:
            return (
                <>
                    <UpdateFormCertificate initialValues={resource as Certificate} resourceId={resourceId} />
                    <UpdateFormCertificateImage initialValues={resource as Certificate} resourceId={resourceId} />
                </>
            )
        case Resource.PROFILE:
            return (
                <>
                    <UpdateFormProfile initialValues={resource as Profile} resourceId={resourceId}/>
                    <UpdateFormProfileImage initialValues={resource as Profile} resourceId={resourceId}/>
                    <UpdateFormProfileImages initialValues={resource as Profile} resourceId={resourceId}/>
                </>
            )
        case Resource.PROJECT:
            return (
                <>
                    <UpdateFormProject initialValues={resource as Project} resourceId={resourceId} inputs={inputs}/>
                    <UpdateFormProjectImage initialValues={resource as Project} resourceId={resourceId}/>
                    <UpdateFormProjectImages initialValues={resource as Project} resourceId={resourceId}/>
                </>
            )
        default:
            return null; 
    }
}