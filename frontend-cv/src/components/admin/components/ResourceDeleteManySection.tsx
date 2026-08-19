"use client";
import { Resource } from "@/variables/admin/resource";
import { Slider, Contact, Certificate, Project, TechStack, TechCategory, User, Role } from "@/gql/graphql";
import DeleteFormSlider from "@/components/admin/slider/DeleteFormSlider";
import DeleteFormContact from "@/components/admin/contact/DeleteFormContact";
import DeleteFormCertificate from "../certificates/DeleteFormCertificate";
import DeleteFormProject from "../projects/DeleteFormProject";
import DeleteFormTechStack from "../techstack/DeleteFormTechStack";
import DeleteFormTechCategory from "../techcategory/DeleteFormTechCategory";
import DeleteFormUser from "../user/DeleteFormUser";
import DeleteFormRole from "../roles/DeleteFormRole";
import FormDeleteMany from "./FormDeleteMany";
interface ResourceSectionProps {
    currentResource: Resource;
    resourceId: string;
}

export default function ResourceDeleteManySection({currentResource, resourceId}: ResourceSectionProps) {
    switch (currentResource) {
       case Resource.CONTACT:
            return (
                <>
                    <FormDeleteMany currentResource={currentResource}/>
                </>
            )
        case Resource.SLIDER:
            return (
                <>
                    <FormDeleteMany currentResource={currentResource}/>
                </>
            )
        case Resource.CERTIFICATE:
            
            return (
                <>
                  <FormDeleteMany currentResource={currentResource}/>
                </>
            );
        case Resource.PROJECT:
            
            return (
                <>
                    <FormDeleteMany currentResource={currentResource}/>
                </>);
        case Resource.TECHSTACK:
           
             return (
                <>
                    <FormDeleteMany currentResource={currentResource}/>
                </>
             ) 
        case Resource.CATEGORY:
             
             return (
                <>
                    <FormDeleteMany currentResource={currentResource}/>
                </>
             )
        case Resource.USER:
            
             return (
                <>
                    <FormDeleteMany resourceId={resourceId} currentResource={currentResource}/>
                </>
             )
        case Resource.ROLE:
          
            return (
                <>
                    <FormDeleteMany currentResource={currentResource}/>
                </>
             )
        default:
            return null; 
    }
}