import { GetSlidersQuery, GetUserMutation } from "@/gql/graphql";
import { Resource } from "@/variables/admin/resource";
import ProfileSection from "./ProfileSection";
import ContactSection from "@/components/admin/contact/ContactSection";
import { getContacts } from "@/query/contact.query";
import { queryGraphQL } from "@/query/graphql";
import { SLIDERS_GET_QUERY } from "@/graphql/slider.graphql";
import SliderSection from "@/components/admin/slider/SliderSection";

interface ResourceSectionProps {
    user: GetUserMutation['getUser'];
    currentResource: Resource;
}

export default async function ResourceSection({user, currentResource}: ResourceSectionProps) {
      switch (currentResource) {
        case Resource.PROFILE:
          return <ProfileSection user={user} />;
        case Resource.CONTACT:
          const contacts = await getContacts();
          return <ContactSection user={user} rows={contacts} />;
        case Resource.SLIDER:
          const sliders = await queryGraphQL<GetSlidersQuery>(SLIDERS_GET_QUERY);
          return <SliderSection user={user} rows={sliders.sliders} />;
        default:
          return null;
      }
      
}