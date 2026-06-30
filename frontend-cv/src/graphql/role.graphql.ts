import { gql } from '@apollo/client';
import { SLIDER_CREATE_MUTATION, SLIDER_GET_ONE_QUERY, SLIDER_REMOVE_MUTATION, SLIDER_UPDATE_MUTATION, SLIDERS_GET_QUERY } from './slider.graphql';

const ROLES_GET_QUERY = gql`
    query GetRoles {
    roles {
        id
        name
        permissions {
            resource
            actions
        }
        users {
            id
            login
            name
        }
    }
}
`;

const ROLE_GET_ONE_QUERY = gql`
    query GetRole($id: ID!) {
      role(id: $id) {
        id
        name
        permissions {
            resource
            actions
        }
        users {
            id
            login
            name
        }
    }
    }
`;


const RESOURCES_GET_QUERY = gql`
    query GetResources {
        permissions {
            resource
            actions
        }
}
`;


const ROLE_CREATE_MUTATION = gql`
    mutation CreateRole($createRoleInput: CreateRoleInput!) {
      createRole(createRoleInput: $createRoleInput) {
        id
        name
        permissions {
            resource
            actions
        }
        users {
            id
            login
            name
        }
      }
    }
`;

const ROLE_REMOVE_MUTATION = gql`
    mutation RemoveRole($id: ID!) {
      removeRole(id: $id)
    }
`;



const ROLE_UPDATE_MUTATION = gql`
    mutation UpdateRole($updateRoleInput: UpdateRoleInput!) {
      updateRole(updateRoleInput: $updateRoleInput) {
        id
        name
        permissions {
            resource
            actions
        }
        users {
            id
            login
            name
        }
      }
    }
`;

export {RESOURCES_GET_QUERY, SLIDERS_GET_QUERY, SLIDER_GET_ONE_QUERY, SLIDER_CREATE_MUTATION, ROLES_GET_QUERY, ROLE_GET_ONE_QUERY, ROLE_CREATE_MUTATION, ROLE_REMOVE_MUTATION, ROLE_UPDATE_MUTATION, SLIDER_REMOVE_MUTATION, SLIDER_UPDATE_MUTATION };