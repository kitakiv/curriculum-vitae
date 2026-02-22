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

export { PROJECTS_GET_QUERY };