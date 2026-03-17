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
    "\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput)\n}\n": typeof types.SignupDocument,
    "\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n": typeof types.LoginDocument,
    "\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}": typeof types.GetUserDocument,
    "\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n": typeof types.GetCertificatesDocument,
    "\n    query GetContacts {\n      contacts {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": typeof types.GetContactsDocument,
    "\n    query GetContact($id: ID!) {\n      contact(id: $id) {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": typeof types.GetContactDocument,
    "\n    mutation CreateContact($createContactInput: CreateContactInput!) {\n      createContact(createContactInput: $createContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": typeof types.CreateContactDocument,
    "\n    mutation RemoveContact($id: ID!) {\n      removeContact(id: $id)\n    }\n": typeof types.RemoveContactDocument,
    "\n    mutation UpdateContact($updateContactInput: UpdateContactInput!) {\n      updateContact(updateContactInput: $updateContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": typeof types.UpdateContactDocument,
    "\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": typeof types.GetProfileDocument,
    "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.GetProjectsDocument,
    "\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n": typeof types.GetSlidersDocument,
    "\n    query GetSlider($id: ID!) {\n      slider(id: $id) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n        }\n    }\n": typeof types.GetSliderDocument,
    "\n    mutation CreateSlider($createSliderInput: CreateSliderInput!) {\n      createSlider(createSliderInput: $createSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": typeof types.CreateSliderDocument,
    "\n    mutation RemoveSlider($id: ID!) {\n      removeSlider(id: $id)\n    }\n": typeof types.RemoveSliderDocument,
    "\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": typeof types.UpdateSliderDocument,
    "\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n        }\n    }\n": typeof types.GetTechCategoriesDocument,
    "\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.GetTechCategoryDocument,
    "\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n": typeof types.GetProjectsByTechStackDocument,
    "\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n        }\n    }\n": typeof types.GetTechStacksDocument,
};
const documents: Documents = {
    "\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput)\n}\n": types.SignupDocument,
    "\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n": types.LoginDocument,
    "\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}": types.GetUserDocument,
    "\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n": types.GetCertificatesDocument,
    "\n    query GetContacts {\n      contacts {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": types.GetContactsDocument,
    "\n    query GetContact($id: ID!) {\n      contact(id: $id) {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": types.GetContactDocument,
    "\n    mutation CreateContact($createContactInput: CreateContactInput!) {\n      createContact(createContactInput: $createContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": types.CreateContactDocument,
    "\n    mutation RemoveContact($id: ID!) {\n      removeContact(id: $id)\n    }\n": types.RemoveContactDocument,
    "\n    mutation UpdateContact($updateContactInput: UpdateContactInput!) {\n      updateContact(updateContactInput: $updateContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": types.UpdateContactDocument,
    "\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": types.GetProfileDocument,
    "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.GetProjectsDocument,
    "\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n": types.GetSlidersDocument,
    "\n    query GetSlider($id: ID!) {\n      slider(id: $id) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n        }\n    }\n": types.GetSliderDocument,
    "\n    mutation CreateSlider($createSliderInput: CreateSliderInput!) {\n      createSlider(createSliderInput: $createSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": types.CreateSliderDocument,
    "\n    mutation RemoveSlider($id: ID!) {\n      removeSlider(id: $id)\n    }\n": types.RemoveSliderDocument,
    "\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": types.UpdateSliderDocument,
    "\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n        }\n    }\n": types.GetTechCategoriesDocument,
    "\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.GetTechCategoryDocument,
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
export function graphql(source: "\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput)\n}\n"): (typeof documents)["\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n"): (typeof documents)["\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}"): (typeof documents)["\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n"): (typeof documents)["\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetContacts {\n      contacts {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n"): (typeof documents)["\n    query GetContacts {\n      contacts {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetContact($id: ID!) {\n      contact(id: $id) {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n"): (typeof documents)["\n    query GetContact($id: ID!) {\n      contact(id: $id) {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateContact($createContactInput: CreateContactInput!) {\n      createContact(createContactInput: $createContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateContact($createContactInput: CreateContactInput!) {\n      createContact(createContactInput: $createContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveContact($id: ID!) {\n      removeContact(id: $id)\n    }\n"): (typeof documents)["\n    mutation RemoveContact($id: ID!) {\n      removeContact(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateContact($updateContactInput: UpdateContactInput!) {\n      updateContact(updateContactInput: $updateContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateContact($updateContactInput: UpdateContactInput!) {\n      updateContact(updateContactInput: $updateContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n"];
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
export function graphql(source: "\n    query GetSlider($id: ID!) {\n      slider(id: $id) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n        }\n    }\n"): (typeof documents)["\n    query GetSlider($id: ID!) {\n      slider(id: $id) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateSlider($createSliderInput: CreateSliderInput!) {\n      createSlider(createSliderInput: $createSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n"): (typeof documents)["\n    mutation CreateSlider($createSliderInput: CreateSliderInput!) {\n      createSlider(createSliderInput: $createSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveSlider($id: ID!) {\n      removeSlider(id: $id)\n    }\n"): (typeof documents)["\n    mutation RemoveSlider($id: ID!) {\n      removeSlider(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n        }\n    }\n"): (typeof documents)["\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"];
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