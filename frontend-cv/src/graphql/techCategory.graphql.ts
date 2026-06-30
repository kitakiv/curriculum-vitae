import { gql } from '@apollo/client';


const TECHCATEGORIES_GET_QUERY = gql`
    query GetTechCategories {
        techCategories {
            categoryName
            id
            techStacks {
                id
                techName
            }
        }
    }
`;

const TECHCATEGORY_TECHSTACK_QUERY = gql`
    query GetTechCategory($id: ID!) {
        techCategory(id: $id) {
            categoryName
            id
            techStacks {
                id
                techName
                techSvg
            }
        }
    }
`;

const TECHCATEGORY_CREATE_MUTATION = gql`
    mutation CreateTechCategory($createTechCategoryInput: CreateTechCategoryInput!) {
        createTechCategory(createTechCategoryInput: $createTechCategoryInput) {
            id
            categoryName
            techStacks {
                id
                techName
            }
        }
    }
`;

const TECHCATEGORY_DELETE_MUTATION = gql`
    mutation RemoveTechCategory($id: ID!) {
        removeTechCategory(id: $id)
    }
`;

const TECHCATEGORY_UPDATE_MUTATION = gql`
    mutation UpdateTechCategory($updateTechCategoryInput: UpdateTechCategoryInput!) {
        updateTechCategory(updateTechCategoryInput: $updateTechCategoryInput) {
            id
            categoryName
            techStacks {
                id
                techName
            }
        }
    }
`;

const TECHCATEGORY_GET_ONE_QUERY = gql`
    query GetTechCategory($id: ID!) {
        techCategory(id: $id) {
            categoryName
            id
            techStacks {
                id
                techName
                techSvg
            }
        }
    }
`;

export { TECHCATEGORIES_GET_QUERY, TECHCATEGORY_TECHSTACK_QUERY, TECHCATEGORY_CREATE_MUTATION, TECHCATEGORY_DELETE_MUTATION, TECHCATEGORY_UPDATE_MUTATION, TECHCATEGORY_GET_ONE_QUERY };