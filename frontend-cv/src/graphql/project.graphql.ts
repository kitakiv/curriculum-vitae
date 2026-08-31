import { gql } from "@apollo/client";

const PROJECTS_GET_QUERY = gql`
    query GetProjects {
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
`;


const PROJECTS_GET_PAGINATED_QUERY = gql`
    query GetProjectsPagination($limit: Int!, $page: Int!) {
        projectsPagination(limit: $limit, page: $page) {
         limit
         page
         total
         totalPages
         items {
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

const PROJECTS_GET_BY_TECH_QUERY = gql`
query ProjectsByTechStack($limit: Int!, $page: Int!, $techId: ID!) {
    projectsByTechStack(
      limit: $limit,
      page: $page,
      techId: $techId
    ) {
        limit
        page
        total
        totalPages
        items {
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
}`;


const PROJECT_GET_ONE_QUERY = gql`
    query GetProject($id: ID!) {
        project(id: $id) {
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
`;

const PROJECT_UPDATE_MUTATION = gql`
    mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {
        updateProject(updateProjectInput: $updateProjectInput) {
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
`;

const PROJECT_REMOVE_MUTATION = gql`
    mutation RemoveProject($id: ID!) {
        removeProject(id: $id)
    }
`;

const PROJECTS_REMOVE_MUTATION = gql`
    mutation RemoveProjects($ids: [ID!]!) {
        removeProjects(ids: $ids)
    }
`;


const PROJECT_CREATE_MUTATION = gql`
    mutation CreateProject($createProjectInput: CreateProjectInput!) {
        createProject(createProjectInput: $createProjectInput) {
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
`;

export {
    PROJECTS_GET_PAGINATED_QUERY,
    PROJECTS_GET_QUERY,
    PROJECT_UPDATE_MUTATION,
    PROJECT_REMOVE_MUTATION,
    PROJECT_CREATE_MUTATION,
    PROJECT_GET_ONE_QUERY,
    PROJECTS_REMOVE_MUTATION,
    PROJECTS_GET_BY_TECH_QUERY
};