'use server'

import { Resource, resourceConfig } from "@/variables/admin/resource";
import { queryGraphQL } from "./graphql";
import { CONTACT_GET_ONE_QUERY } from "@/graphql/contacts.graphql";
import { CreateProjectInput, GetCertificateQuery, GetCertificateQueryVariables, GetContactQuery, GetContactQueryVariables, GetProfileQuery, GetProjectQuery, GetProjectQueryVariables, GetSliderQuery, GetSliderQueryVariables, GetTechStackQuery, GetTechStackQueryVariables, GetTechStacksQuery, GetTechStacksQueryVariables } from "@/gql/graphql";
import { SLIDER_GET_ONE_QUERY } from "@/graphql/slider.graphql";
import { CERTIFICATE_GET_ONE_QUERY } from "@/graphql/certificate.graphql";
import { PROFILE_GET_QUERY } from "@/graphql/profile.graphql";
import { TECHSTACK_GET_ONE_QUERY, TECHSTACKS_GET_QUERY } from "@/graphql/techStack.graphql";
import { InputType } from "../types";
import { PROJECT_GET_ONE_QUERY } from "@/graphql/project.graphql";
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
        case Resource.PROJECT:
            return (await queryGraphQL<GetProjectQuery, GetProjectQueryVariables>(PROJECT_GET_ONE_QUERY, { id: resourceId })).project;
        case Resource.TECHSTACK:
            return ((await queryGraphQL<GetTechStackQuery, GetTechStackQueryVariables>(TECHSTACK_GET_ONE_QUERY, { id: resourceId })).techstack);
        default:
            return null;
    }
}

export async function getInputsValues(resource: Resource) {
    switch (resource) {
        // in the initial values we also want techStackIds for the project resource, so we need to handle it separately
       case Resource.PROJECT:
        const projectInputsAdd = resourceConfig[Resource.PROJECT].createForm.inputs;
        const techStacks = (await queryGraphQL<GetTechStacksQuery, GetTechStacksQueryVariables>(TECHSTACKS_GET_QUERY)).techstacks.map(techstack => ({ value: techstack.id, label: techstack.techName }));
        return projectInputsAdd.map((input: InputType) => {
            if (input.name === 'techStacks') {
                input.options = techStacks;
            }
            return input;
        });
       default:
       return null;
    }

}

export async function getResouseInputsEdit(resource: Resource) {
    switch (resource) {
        // in the initial values we also want techStackIds for the project resource, so we need to handle it separately
       case Resource.PROJECT:
        const projectInputsEdit = resourceConfig[Resource.PROJECT].editForm.inputs;
        const techStacks = (await queryGraphQL<GetTechStacksQuery, GetTechStacksQueryVariables>(TECHSTACKS_GET_QUERY)).techstacks.map(techstack => ({ value: techstack.id, label: techstack.techName }));
        return projectInputsEdit.map((input: InputType) => {
            if (input.name === 'techStacks') {
                input.options = techStacks;
            }
            return input;
        });
       default:
       return null;
    }
}