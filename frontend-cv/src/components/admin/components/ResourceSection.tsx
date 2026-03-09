'use client'
import { GetUserMutation } from "@/gql/graphql";
import { checkResource, getUserResources, returnResourceData } from "@/query/permissions";
import { adminVariables, Resource } from "@/variables/admin/resource";
import { useSearchParams } from "next/navigation";
import ProfileSection from "./ProfileSection";
import ContactSection from "./ContactSection";

interface ResourceSectionProps {
    user: GetUserMutation['getUser'];
}

function checkResouce(currentResource: string | null, resourse: Resource) {
    if (currentResource === resourse + 's' || currentResource === resourse) {
        return true;
    }
    return false;
}
export default function ResourceSection({user}: ResourceSectionProps) {
     const searchParams = useSearchParams();
      const currentResource = searchParams.get(adminVariables.searchParamResourse);
      const userResources = getUserResources(user);

      const matchedResource = userResources.find(resource => 
        checkResource(currentResource, resource)
      );

      if (!matchedResource) return null;
      const resourceData = returnResourceData(currentResource);
      if (checkResouce(currentResource, Resource.PROFILE)) {
        return <ProfileSection/>
      }
      if (checkResouce(currentResource, Resource.CONTACT)) {
        return <ContactSection/>
      }
      
}