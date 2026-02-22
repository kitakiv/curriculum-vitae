/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": typeof types.GetProfileDocument,
    "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.GetProjectsDocument,
    "\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n": typeof types.GetSlidersDocument,
    "\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n": typeof types.GetProjectsByTechStackDocument,
    "\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n        }\n    }\n": typeof types.GetTechStacksDocument,
};
const documents: Documents = {
    "\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": types.GetProfileDocument,
    "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.GetProjectsDocument,
    "\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n": types.GetSlidersDocument,
    "\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n": types.GetProjectsByTechStackDocument,
    "\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n        }\n    }\n": types.GetTechStacksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n"): (typeof documents)["\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n"): (typeof documents)["\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n        }\n    }\n"): (typeof documents)["\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;