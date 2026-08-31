
import { GetCertificatesQuery, GetContactsQuery, GetProfileQuery, GetProjectsQuery, GetRolesQuery, GetSlidersQuery, GetTechCategoriesQuery, GetTechStacksQuery, GetUserMutation, GetUsersQuery } from "@/gql/graphql";
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
import ProjectSection from "@/components/admin/projects/ProjectSection";
import { PROJECTS_GET_QUERY } from "@/graphql/project.graphql";
import { TECHSTACKS_GET_QUERY } from "@/graphql/techStack.graphql";
import { USERS_GET_QUERY } from "@/graphql/auth.graphql";
import TechStackSection from "../techstack/TechStackSection";
import { TECHCATEGORIES_GET_QUERY } from "@/graphql/techCategory.graphql";
import TechCategorySection from "../techcategory/TechCategorySection";
import UserSection from "../user/UserSection";
import { ROLES_GET_QUERY } from "@/graphql/role.graphql";
import RoleSection from "../roles/RoleSection";
import { adminVariables } from "@/variables/admin/resource";
import ErrorMessage from "@/components/admin/components/ErrorMessage";

interface ResourceSectionProps {
  user: GetUserMutation['getUser'];
  currentResource: Resource;
}

export default async function ResourceSection({ user, currentResource }: ResourceSectionProps) {
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
    case Resource.PROJECT:
      const projects = await queryGraphQL<GetProjectsQuery>(PROJECTS_GET_QUERY);
      return <ProjectSection user={user} rows={projects.projects} />;
    case Resource.TECHSTACK:
      const techStacks = await queryGraphQL<GetTechStacksQuery>(TECHSTACKS_GET_QUERY);
      return <TechStackSection user={user} rows={techStacks.techstacks} />;
    case Resource.CATEGORY:
      const techCategories = await queryGraphQL<GetTechCategoriesQuery>(TECHCATEGORIES_GET_QUERY);
      return <TechCategorySection user={user} rows={techCategories.techCategories} />;
    case Resource.USER:
      const users = await queryGraphQL<GetUsersQuery>(USERS_GET_QUERY);
      return <UserSection user={user} rows={users.users} />;
    case Resource.ROLE:
      const roles = await queryGraphQL<GetRolesQuery>(ROLES_GET_QUERY);
      return <RoleSection user={user} rows={roles.roles} />;
    default:
      return <ErrorMessage>{adminVariables.invalidResource}</ErrorMessage>;
  }

}