'use server'

import { Resource } from "@/variables/admin/resource";
import { queryGraphQL } from "./graphql";
import { CONTACT_GET_ONE_QUERY } from "@/graphql/contacts.graphql";
import { GetContactQuery, GetContactQueryVariables, GetSliderQuery, GetSliderQueryVariables } from "@/gql/graphql";
import { SLIDER_GET_ONE_QUERY } from "@/graphql/slider.graphql";

export async function getResourceById(resource: Resource, resourceId: string) {
    switch (resource) {
        case Resource.CONTACT:
            return (await queryGraphQL<GetContactQuery, GetContactQueryVariables>(CONTACT_GET_ONE_QUERY, { id: resourceId })).contact; 
        case Resource.SLIDER:
            return (await queryGraphQL<GetSliderQuery, GetSliderQueryVariables>(SLIDER_GET_ONE_QUERY, { id: resourceId })).slider;
        default:
            return null;
    }
}