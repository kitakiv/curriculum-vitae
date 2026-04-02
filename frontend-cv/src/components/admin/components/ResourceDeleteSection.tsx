"use client";
import { Resource } from "@/variables/admin/resource";
import { Slider, Contact, Certificate, Project, TechStack, TechCategory, User } from "@/gql/graphql";
import DeleteFormSlider from "@/components/admin/slider/DeleteFormSlider";
import DeleteFormContact from "@/components/admin/contact/DeleteFormContact";
import DeleteFormCertificate from "../certificates/DeleteFormCertificate";
import DeleteFormProject from "../projects/DeleteFormProject";
import DeleteFormTechStack from "../techstack/DeleteFormTechStack";
import DeleteFormTechCategory from "../techcategory/DeleteFormTechCategory";
import DeleteFormUser from "../user/DeleteFormUser";
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
            );
        case Resource.PROJECT:
            const project = resource as Project;
            return (
                <>
                    <DeleteFormProject resource={project} resourceId={resourceId} />
                </>);
        case Resource.TECHSTACK:
            const techStack = resource as TechStack;
             return (
                <>
                    <DeleteFormTechStack resourceId={resourceId} resource={techStack} />
                </>
             ) 
        case Resource.CATEGORY:
             const category = resource as TechCategory;
             return (
                <>
                    <DeleteFormTechCategory resourceId={resourceId} resource={category} />
                </>
             )
        case Resource.USER:
            const user = resource as User;
             return (
                <>
                    <DeleteFormUser resourceId={resourceId} resource={user} />
                </>
             )
        default:
            return null; 
    }
}