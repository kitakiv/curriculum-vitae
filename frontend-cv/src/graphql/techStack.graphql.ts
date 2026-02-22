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
        }
    }
`;

export { TECHSTACK_PROJECTS_QUERY, TECHSTACKS_GET_QUERY };
