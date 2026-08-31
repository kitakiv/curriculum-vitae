"use client";
import { Resource } from "@/variables/admin/resource";
import UpdateFormContactImage from "@/components/admin/contact/UpdateFormContactImage";
import UpdateFormContact from "@/components/admin/contact/UpdateFormContact";
import UpdateFormSlider from "@/components/admin/slider/UpdateFormSlider";
import UpdateFormSliderImage from "@/components/admin/slider/UpdateFormSliderImage";
import { Contact, Profile, Project, Role, Slider, TechCategory, TechStack, User, Certificate } from "@/gql/graphql";
import UpdateFormCertificate from "../certificates/UpdateFormCertificate";
import UpdateFormCertificateImage from "../certificates/UpdateFormCertificateImage";
import UpdateFormProfile from "../profile/UpdateFormProfile";
import UpdateFormProfileImage from "../profile/UpdateFormProfileImage";
import UpdateFormProject from "../projects/UpdateFormProject";
import UpdateFormProjectImage from "../projects/UpdateFormProjectImage";
import { InputType } from "@/types/index";
import UpdateFormTechStack from "../techstack/UpdateFormTechStack";
import UpdateFormTechStackImage from "../techstack/UpdateTechStackImage";
import UpdateFormTechCategory from "../techcategory/UpdateFormTechCategory";
import AttachFormRoleUser from "../user/AttachFormRoleUser";
import UpdateFormRole from "../roles/UpdateFormRole";
interface ResourceSectionProps<R> {
    currentResource: Resource | null | undefined;
    resourceId: string;
    resource: R;
    inputs: InputType[] | null;
    initialValues?: object
}

export default function ResourceUpdateSection<R>({currentResource, resourceId, resource, inputs, initialValues}: ResourceSectionProps<R>) {
    switch (currentResource) {
       case Resource.CONTACT:
            return (
                <div className="lg:grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
                    <UpdateFormContact initialValues={resource as Contact} resourceId={resourceId}/>
                    <UpdateFormContactImage initialValues={resource as Contact} resourceId={resourceId}/>
                </div>
            )
        case Resource.SLIDER:
            return (
                <div className="lg:grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
                    <UpdateFormSlider initialValues={resource as Slider} resourceId={resourceId}/>
                    <UpdateFormSliderImage initialValues={resource as Slider} resourceId={resourceId}/>
                </div>
            )
        case Resource.CERTIFICATE:
            return (
                <div className="lg:grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
                    <UpdateFormCertificate initialValues={resource as Certificate} resourceId={resourceId} />
                    <UpdateFormCertificateImage initialValues={resource as Certificate} resourceId={resourceId} />
                </div>
            )
        case Resource.PROFILE:
            return (
                <div className="lg:grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
                    <UpdateFormProfile initialValues={resource as Profile} resourceId={resourceId}/>
                    <UpdateFormProfileImage initialValues={resource as Profile} resourceId={resourceId}/>
                </div >
            )
        case Resource.PROJECT:
            return (
                <div className="lg:grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
                    <UpdateFormProject initialValues={resource as Project} resourceId={resourceId} inputs={inputs}/>
                    <UpdateFormProjectImage initialValues={resource as Project} resourceId={resourceId}/>
                </div>
            )
        case Resource.TECHSTACK:
            return (
                <>
                    <UpdateFormTechStack initialValues={resource as TechStack} resourceId={resourceId} inputs={inputs}/>
                    <UpdateFormTechStackImage initialValues={resource as TechStack} resourceId={resourceId}/>
                </>
            )
        case Resource.CATEGORY:
            return (
                <>
                    <UpdateFormTechCategory initialValues={resource as TechCategory} resourceId={resourceId} inputs={inputs}/>
                </>
            )
        case Resource.USER:
             return (
                <>
                    <AttachFormRoleUser initialValues={resource as User} resourceId={resourceId} inputs={inputs}/>
                </>
            )
        case Resource.ROLE:
            return (
                <>
                    <UpdateFormRole initialValues={resource as Role} resourceId={resourceId} inputs={inputs} initialValuesFields={initialValues as { name: string, permissions: Record<string, Record<string, boolean>>}}/>
                </>
            )
        default:
            return null; 
    }
}