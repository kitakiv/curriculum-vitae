import { gql } from '@apollo/client';

const TECHSTACK_PROJECTS_QUERY = gql`
	query GetProjectsByTechStack($id: ID!) {
		techstack(id: $id) {
			id
            techName
            techSvg
            projects {
                id
                projectDemoLink
                projectDescription
                projectGithubLink
                projectImages
                projectTitle
                techStacks {
                    id
                    techName
                    techSvg
                }
            }
		}
	}
`;

const TECHSTACKS_GET_QUERY = gql`
    query GetTechStacks {
        techstacks {
            id
            techName
            techSvg
            projects {
                id
                projectTitle
            }
            techCategories {
                id
                categoryName
            }
        }
    }
`;

const TECHSTACK_GET_PAGINATED_QUERY = gql`
query TechstackPagination($limit: Int, $page: Int, $categoryId: ID) {
    techstackPagination(limit: $limit, page: $page, categoryId: $categoryId) {
        limit
        page
        total
        totalPages
        items {
            id
            techName
            techSvg
        }
    }
}`


const TECHSTACK_CREATE_MUTATION = gql`
    mutation CreateTechStack($createTechStackInput: CreateTechStackInput!) {
        createTechStack(createTechStackInput: $createTechStackInput) {
            id
            techName
            techSvg
            projects {
                id
                projectTitle
            }
            techCategories {
                id
                categoryName
            }
        }
    }
`;

const TECHSTACK_UPDATE_MUTATION = gql`
    mutation UpdateTechStack($updateTechStackInput: UpdateTechStackInput!) {
        updateTechStack(updateTechStackInput: $updateTechStackInput) {
            id
            techName
            techSvg
            projects {
                id
                projectTitle
            }
            techCategories {
                id
                categoryName
            }
        }
    }
`;

const TECHSTACK_DELETE_MUTATION = gql`
    mutation DeleteTechStack($id: ID!) {
        removeTechStack(id: $id)
    }
`;

const TECHSTACKS_DELETE_MUTATION = gql`
    mutation DeleteTechStacks($ids: [ID!]!) {
        removeTechStacks(ids: $ids)
    }
`;

const TECHSTACK_GET_ONE_QUERY = gql`
    query GetTechStack($id: ID!) {
        techstack(id: $id) {
            id
            techName
            techSvg
            projects {
                id
                projectTitle
            }
            techCategories {
                id
                categoryName
            }
        }
    }
`;

export {
    TECHSTACK_PROJECTS_QUERY,
    TECHSTACKS_GET_QUERY,
    TECHSTACK_DELETE_MUTATION,
    TECHSTACK_CREATE_MUTATION,
    TECHSTACK_UPDATE_MUTATION,
    TECHSTACK_GET_ONE_QUERY,
    TECHSTACKS_DELETE_MUTATION,
    TECHSTACK_GET_PAGINATED_QUERY
};
