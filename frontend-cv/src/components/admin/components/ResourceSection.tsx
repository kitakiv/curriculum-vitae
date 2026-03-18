import { GetCertificatesQuery, GetContactsQuery, GetProfileQuery, GetSlidersQuery, GetUserMutation } from "@/gql/graphql";
import { Resource } from "@/variables/admin/resource";
import ContactSection from "@/components/admin/contact/ContactSection";
import { queryGraphQL } from "@/query/graphql";
import { SLIDERS_GET_QUERY } from "@/graphql/slider.graphql";
import SliderSection from "@/components/admin/slider/SliderSection";
import { CERTIFICATE_GET_QUERY } from "@/graphql/certificate.graphql";
import CertificateSection from "../certificates/CertificateSection";
import { CONTACT_GET_QUERY } from "@/graphql/contacts.graphql";
import { PROFILE_GET_QUERY } from "@/graphql/profile.graphql";
import ProfileSection from "../profile/ProfileSection";

interface ResourceSectionProps {
    user: GetUserMutation['getUser'];
    currentResource: Resource;
}

export default async function ResourceSection({user, currentResource}: ResourceSectionProps) {
      switch (currentResource) {
        case Resource.CONTACT:
          const contacts = await queryGraphQL<GetContactsQuery>(CONTACT_GET_QUERY);
          return <ContactSection user={user} rows={contacts.contacts} />;
        case Resource.SLIDER:
          const sliders = await queryGraphQL<GetSlidersQuery>(SLIDERS_GET_QUERY);
          return <SliderSection user={user} rows={sliders.sliders} />;
        case Resource.CERTIFICATE:
          const certificates = await queryGraphQL<GetCertificatesQuery>(CERTIFICATE_GET_QUERY);
          return <CertificateSection user={user} rows={certificates.certificates} />;
        case Resource.PROFILE:
          const profile = await queryGraphQL<GetProfileQuery>(PROFILE_GET_QUERY);
          return <ProfileSection user={user} rows={profile.profile} />;
        default:
          return null;
      }
      
}