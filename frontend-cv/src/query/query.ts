'use server'

import { Resource } from "@/variables/admin/resource";
import { queryGraphQL } from "./graphql";
import { CONTACT_GET_ONE_QUERY } from "@/graphql/contacts.graphql";
import { GetCertificateQuery, GetCertificateQueryVariables, GetContactQuery, GetContactQueryVariables, GetProfileQuery, GetSliderQuery, GetSliderQueryVariables } from "@/gql/graphql";
import { SLIDER_GET_ONE_QUERY } from "@/graphql/slider.graphql";
import { CERTIFICATE_GET_ONE_QUERY } from "@/graphql/certificate.graphql";
import { PROFILE_GET_QUERY } from "@/graphql/profile.graphql";

export async function getResourceById(resource: Resource, resourceId: string) {
    switch (resource) {
        case Resource.CONTACT:
            return (await queryGraphQL<GetContactQuery, GetContactQueryVariables>(CONTACT_GET_ONE_QUERY, { id: resourceId })).contact; 
        case Resource.SLIDER:
            return (await queryGraphQL<GetSliderQuery, GetSliderQueryVariables>(SLIDER_GET_ONE_QUERY, { id: resourceId })).slider;
        case Resource.CERTIFICATE:
            return (await queryGraphQL<GetCertificateQuery, GetCertificateQueryVariables>(CERTIFICATE_GET_ONE_QUERY, { id: resourceId })).certificate;
        case Resource.PROFILE:
            return ((await queryGraphQL<GetProfileQuery>(PROFILE_GET_QUERY)).profile);
        default:
            return null;
    }
}