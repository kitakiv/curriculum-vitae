'use server'

import { Resource, resourceConfig } from "@/variables/admin/resource";
import { queryGraphQL } from "./graphql";
import { CONTACT_GET_ONE_QUERY } from "@/graphql/contacts.graphql";
import { GetCertificateQuery, GetCertificateQueryVariables, GetContactQuery, GetContactQueryVariables, GetOneUserQuery, GetOneUserQueryVariables, GetProfileQuery, GetProjectQuery, GetProjectQueryVariables, GetProjectsQuery, GetProjectsQueryVariables, GetRoleQuery, GetRoleQueryVariables, GetSliderQuery, GetSliderQueryVariables, GetTechCategoriesQuery, GetTechCategoriesQueryVariables, GetTechCategoryQuery, GetTechCategoryQueryVariables, GetTechStackQuery, GetTechStackQueryVariables, GetTechStacksQuery, GetTechStacksQueryVariables, GetUserMutation, GetUserMutationVariables } from "@/gql/graphql";
import { SLIDER_GET_ONE_QUERY } from "@/graphql/slider.graphql";
import { CERTIFICATE_GET_ONE_QUERY } from "@/graphql/certificate.graphql";
import { PROFILE_GET_QUERY } from "@/graphql/profile.graphql";
import { TECHSTACK_GET_ONE_QUERY, TECHSTACKS_GET_QUERY } from "@/graphql/techStack.graphql";
import { InputType } from "../types";
import { PROJECT_GET_ONE_QUERY, PROJECTS_GET_QUERY } from "@/graphql/project.graphql";
import { TECHCATEGORIES_GET_QUERY, TECHCATEGORY_GET_ONE_QUERY } from "@/graphql/techCategory.graphql";
import { USER_GET_ONE_QUERY } from "@/graphql/auth.graphql";
import { ROLE_GET_ONE_QUERY } from "@/graphql/role.graphql";
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
        case Resource.CATEGORY:
            return ((await queryGraphQL<GetTechCategoryQuery, GetTechCategoryQueryVariables>(TECHCATEGORY_GET_ONE_QUERY, { id: resourceId })).techCategory);
        case Resource.USER:
            return ((await queryGraphQL<GetOneUserQuery, GetOneUserQueryVariables>(USER_GET_ONE_QUERY, { id: resourceId })).userById);
        case Resource.ROLE:
            return ((await queryGraphQL<GetRoleQuery, GetRoleQueryVariables>(ROLE_GET_ONE_QUERY, { id: resourceId })).role);
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
        case Resource.TECHSTACK:
        const techCategories = (await queryGraphQL<GetTechCategoriesQuery, GetTechCategoriesQueryVariables>(TECHCATEGORIES_GET_QUERY)).techCategories.map(category => ({ value: category.id, label: category.categoryName }));
        const projects = (await queryGraphQL<GetProjectsQuery, GetProjectsQueryVariables>(PROJECTS_GET_QUERY)).projects.map(project => ({ value: project.id, label: project.projectTitle }));
        return resourceConfig[Resource.TECHSTACK].createForm.inputs.map((input: InputType) => {
            if (input.name === 'techCategories') {
                input.options = techCategories;
            }
            else if(input.name === 'projects'){
                input.options = projects;
            }
            return input;
        });
        case Resource.CATEGORY:
            const techStacksAll = (await queryGraphQL<GetTechStacksQuery, GetTechStacksQueryVariables>(TECHSTACKS_GET_QUERY)).techstacks.map(techstack => ({ value: techstack.id, label: techstack.techName }));
            return resourceConfig[Resource.CATEGORY].createForm.inputs.map((input: InputType) => {
                if (input.name === 'techStacks') {
                    input.options = techStacksAll;
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
        case Resource.TECHSTACK:
            const intputsEdit = resourceConfig[Resource.TECHSTACK].editForm;
        const techCategories = (await queryGraphQL<GetTechCategoriesQuery, GetTechCategoriesQueryVariables>(TECHCATEGORIES_GET_QUERY)).techCategories.map(category => ({ value: category.id, label: category.categoryName }));
        const projects = (await queryGraphQL<GetProjectsQuery, GetProjectsQueryVariables>(PROJECTS_GET_QUERY)).projects.map(project => ({ value: project.id, label: project.projectTitle }));
        return intputsEdit.inputs.map((input: InputType) => {
            if (input.name === 'techCategories') {
                input.options = techCategories;
            }
            else if(input.name === 'projects'){
                input.options = projects;
            }
            return input;
        });
        case Resource.CATEGORY: 
            const inputsEditCategory = resourceConfig[Resource.CATEGORY].editForm;
            const techStacksAll = (await queryGraphQL<GetTechStacksQuery, GetTechStacksQueryVariables>(TECHSTACKS_GET_QUERY)).techstacks.map(techstack => ({ value: techstack.id, label: techstack.techName }));
            return inputsEditCategory.inputs.map((input: InputType) => {
                if (input.name === 'techStacks') {
                    input.options = techStacksAll;
                }
                return input;
            });
       default:
       return null;
    }
}