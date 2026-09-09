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
    "\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput) {\n        login\n        success\n        message\n    }\n}\n": typeof types.SignupDocument,
    "\nmutation RefreshTheTokens {\n    refreshTheTokens {\n        tokens {\n            accessToken\n        }\n    }\n}\n": typeof types.RefreshTheTokensDocument,
    "\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n": typeof types.LoginDocument,
    "\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            id\n            name\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}": typeof types.GetUserDocument,
    "\n    query GetUsers {\n    users {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n": typeof types.GetUsersDocument,
    "\n    mutation UpdateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n        avatarPhoto\n        id\n        login\n        name\n    }\n}": typeof types.UpdateUserDocument,
    "\n    mutation AttachRoleToUser($attachRoleInput: AttachRoleInput!) {\n    attachRole(attachRoleInput: $attachRoleInput) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n": typeof types.AttachRoleToUserDocument,
    "\n    mutation DeleteUser($id: ID!) {\n    removeUser(id: $id) \n}\n": typeof types.DeleteUserDocument,
    "\n    mutation DeleteUsers($ids: [ID!]!) {\n    removeUsers(ids: $ids) \n}\n": typeof types.DeleteUsersDocument,
    "\n    query GetOneUser($id: ID!) {\n    userById(id: $id) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n": typeof types.GetOneUserDocument,
    "\n    mutation Logout {\n    logout\n}\n": typeof types.LogoutDocument,
    "\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n": typeof types.GetCertificatesDocument,
    "\n    query GetCertificate($id: ID!) {\n      certificate(id: $id) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n        }\n    }\n": typeof types.GetCertificateDocument,
    "\n    mutation CreateCertificate($createCertificateInput: CreateCertificateInput!) {\n      createCertificate(createCertificateInput: $createCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n": typeof types.CreateCertificateDocument,
    "\n    mutation RemoveCertificate($id: ID!) {\n      removeCertificate(id: $id)\n    }\n": typeof types.RemoveCertificateDocument,
    "\n    mutation RemoveCertificates($ids: [ID!]!) {\n      removeCertificates(ids: $ids)\n    }\n": typeof types.RemoveCertificatesDocument,
    "\n    mutation UpdateCertificate($updateCertificateInput: UpdateCertificateInput!) {\n      updateCertificate(updateCertificateInput: $updateCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n": typeof types.UpdateCertificateDocument,
    "\n    query GetContacts {\n      contacts {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": typeof types.GetContactsDocument,
    "\n    query GetContact($id: ID!) {\n      contact(id: $id) {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": typeof types.GetContactDocument,
    "\n    mutation CreateContact($createContactInput: CreateContactInput!) {\n      createContact(createContactInput: $createContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": typeof types.CreateContactDocument,
    "\n    mutation RemoveContact($id: ID!) {\n      removeContact(id: $id)\n    }\n": typeof types.RemoveContactDocument,
    "\n    mutation RemoveContacts($ids: [ID!]!) {\n      removeContacts(ids: $ids)\n    }\n": typeof types.RemoveContactsDocument,
    "\n    mutation UpdateContact($updateContactInput: UpdateContactInput!) {\n      updateContact(updateContactInput: $updateContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": typeof types.UpdateContactDocument,
    "\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": typeof types.GetProfileDocument,
    "\n    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {\n        updateProfile(updateProfileInput: $updateProfileInput) {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": typeof types.UpdateProfileDocument,
    "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.GetProjectsDocument,
    "\n    query GetProjectsPagination($limit: Int!, $page: Int!, $techId: ID) {\n        projectsPagination(limit: $limit, page: $page, techId: $techId) {\n         limit\n         page\n         total\n         totalPages\n         items {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n          }\n        }\n    }\n": typeof types.GetProjectsPaginationDocument,
    "\n    query GetProject($id: ID!) {\n        project(id: $id) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.GetProjectDocument,
    "\n    mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {\n        updateProject(updateProjectInput: $updateProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.UpdateProjectDocument,
    "\n    mutation RemoveProject($id: ID!) {\n        removeProject(id: $id)\n    }\n": typeof types.RemoveProjectDocument,
    "\n    mutation RemoveProjects($ids: [ID!]!) {\n        removeProjects(ids: $ids)\n    }\n": typeof types.RemoveProjectsDocument,
    "\n    mutation CreateProject($createProjectInput: CreateProjectInput!) {\n        createProject(createProjectInput: $createProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.CreateProjectDocument,
    "\n    query GetRoles {\n    roles {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n}\n": typeof types.GetRolesDocument,
    "\n    query GetRole($id: ID!) {\n      role(id: $id) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n    }\n": typeof types.GetRoleDocument,
    "\n    query GetResources {\n        permissions {\n            resource\n            actions\n        }\n}\n": typeof types.GetResourcesDocument,
    "\n    mutation CreateRole($createRoleInput: CreateRoleInput!) {\n      createRole(createRoleInput: $createRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n": typeof types.CreateRoleDocument,
    "\n    mutation RemoveRole($id: ID!) {\n      removeRole(id: $id)\n    }\n": typeof types.RemoveRoleDocument,
    "\n    mutation RemoveRoles($ids: [ID!]!) {\n      removeRoles(ids: $ids)\n    }\n": typeof types.RemoveRolesDocument,
    "\n    mutation UpdateRole($updateRoleInput: UpdateRoleInput!) {\n      updateRole(updateRoleInput: $updateRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n": typeof types.UpdateRoleDocument,
    "\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n": typeof types.GetSlidersDocument,
    "\n    query GetSlider($id: ID!) {\n      slider(id: $id) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n        }\n    }\n": typeof types.GetSliderDocument,
    "\n    mutation CreateSlider($createSliderInput: CreateSliderInput!) {\n      createSlider(createSliderInput: $createSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": typeof types.CreateSliderDocument,
    "\n    mutation RemoveSlider($id: ID!) {\n      removeSlider(id: $id)\n    }\n": typeof types.RemoveSliderDocument,
    "\n    mutation RemoveSliders($ids: [ID!]!) {\n      removeSliders(ids: $ids)\n    }\n": typeof types.RemoveSlidersDocument,
    "\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": typeof types.UpdateSliderDocument,
    "\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n": typeof types.GetTechCategoriesDocument,
    "\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": typeof types.GetTechCategoryDocument,
    "\n    mutation CreateTechCategory($createTechCategoryInput: CreateTechCategoryInput!) {\n        createTechCategory(createTechCategoryInput: $createTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n": typeof types.CreateTechCategoryDocument,
    "\n    mutation RemoveTechCategory($id: ID!) {\n        removeTechCategory(id: $id)\n    }\n": typeof types.RemoveTechCategoryDocument,
    "\n    mutation RemoveTechCategories($ids: [ID!]!) {\n        removeTechCategories(ids: $ids)\n    }\n": typeof types.RemoveTechCategoriesDocument,
    "\n    mutation UpdateTechCategory($updateTechCategoryInput: UpdateTechCategoryInput!) {\n        updateTechCategory(updateTechCategoryInput: $updateTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n": typeof types.UpdateTechCategoryDocument,
    "\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n": typeof types.GetProjectsByTechStackDocument,
    "\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": typeof types.GetTechStacksDocument,
    "\nquery TechstackPagination($limit: Int, $page: Int, $categoryId: ID) {\n    techstackPagination(limit: $limit, page: $page, categoryId: $categoryId) {\n        limit\n        page\n        total\n        totalPages\n        items {\n            id\n            techName\n            techSvg\n        }\n    }\n}": typeof types.TechstackPaginationDocument,
    "\n    mutation CreateTechStack($createTechStackInput: CreateTechStackInput!) {\n        createTechStack(createTechStackInput: $createTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": typeof types.CreateTechStackDocument,
    "\n    mutation UpdateTechStack($updateTechStackInput: UpdateTechStackInput!) {\n        updateTechStack(updateTechStackInput: $updateTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": typeof types.UpdateTechStackDocument,
    "\n    mutation DeleteTechStack($id: ID!) {\n        removeTechStack(id: $id)\n    }\n": typeof types.DeleteTechStackDocument,
    "\n    mutation DeleteTechStacks($ids: [ID!]!) {\n        removeTechStacks(ids: $ids)\n    }\n": typeof types.DeleteTechStacksDocument,
    "\n    query GetTechStack($id: ID!) {\n        techstack(id: $id) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": typeof types.GetTechStackDocument,
};
const documents: Documents = {
    "\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput) {\n        login\n        success\n        message\n    }\n}\n": types.SignupDocument,
    "\nmutation RefreshTheTokens {\n    refreshTheTokens {\n        tokens {\n            accessToken\n        }\n    }\n}\n": types.RefreshTheTokensDocument,
    "\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n": types.LoginDocument,
    "\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            id\n            name\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}": types.GetUserDocument,
    "\n    query GetUsers {\n    users {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n": types.GetUsersDocument,
    "\n    mutation UpdateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n        avatarPhoto\n        id\n        login\n        name\n    }\n}": types.UpdateUserDocument,
    "\n    mutation AttachRoleToUser($attachRoleInput: AttachRoleInput!) {\n    attachRole(attachRoleInput: $attachRoleInput) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n": types.AttachRoleToUserDocument,
    "\n    mutation DeleteUser($id: ID!) {\n    removeUser(id: $id) \n}\n": types.DeleteUserDocument,
    "\n    mutation DeleteUsers($ids: [ID!]!) {\n    removeUsers(ids: $ids) \n}\n": types.DeleteUsersDocument,
    "\n    query GetOneUser($id: ID!) {\n    userById(id: $id) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n": types.GetOneUserDocument,
    "\n    mutation Logout {\n    logout\n}\n": types.LogoutDocument,
    "\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n": types.GetCertificatesDocument,
    "\n    query GetCertificate($id: ID!) {\n      certificate(id: $id) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n        }\n    }\n": types.GetCertificateDocument,
    "\n    mutation CreateCertificate($createCertificateInput: CreateCertificateInput!) {\n      createCertificate(createCertificateInput: $createCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n": types.CreateCertificateDocument,
    "\n    mutation RemoveCertificate($id: ID!) {\n      removeCertificate(id: $id)\n    }\n": types.RemoveCertificateDocument,
    "\n    mutation RemoveCertificates($ids: [ID!]!) {\n      removeCertificates(ids: $ids)\n    }\n": types.RemoveCertificatesDocument,
    "\n    mutation UpdateCertificate($updateCertificateInput: UpdateCertificateInput!) {\n      updateCertificate(updateCertificateInput: $updateCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n": types.UpdateCertificateDocument,
    "\n    query GetContacts {\n      contacts {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": types.GetContactsDocument,
    "\n    query GetContact($id: ID!) {\n      contact(id: $id) {\n        contactLink\n        contactName\n        contactSvg\n        id\n        }\n    }\n": types.GetContactDocument,
    "\n    mutation CreateContact($createContactInput: CreateContactInput!) {\n      createContact(createContactInput: $createContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": types.CreateContactDocument,
    "\n    mutation RemoveContact($id: ID!) {\n      removeContact(id: $id)\n    }\n": types.RemoveContactDocument,
    "\n    mutation RemoveContacts($ids: [ID!]!) {\n      removeContacts(ids: $ids)\n    }\n": types.RemoveContactsDocument,
    "\n    mutation UpdateContact($updateContactInput: UpdateContactInput!) {\n      updateContact(updateContactInput: $updateContactInput) {\n        contactLink\n        contactName\n        contactSvg\n        id\n      }\n    }\n": types.UpdateContactDocument,
    "\n    query GetProfile {\n        profile {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": types.GetProfileDocument,
    "\n    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {\n        updateProfile(updateProfileInput: $updateProfileInput) {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n": types.UpdateProfileDocument,
    "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.GetProjectsDocument,
    "\n    query GetProjectsPagination($limit: Int!, $page: Int!, $techId: ID) {\n        projectsPagination(limit: $limit, page: $page, techId: $techId) {\n         limit\n         page\n         total\n         totalPages\n         items {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n          }\n        }\n    }\n": types.GetProjectsPaginationDocument,
    "\n    query GetProject($id: ID!) {\n        project(id: $id) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.GetProjectDocument,
    "\n    mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {\n        updateProject(updateProjectInput: $updateProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.UpdateProjectDocument,
    "\n    mutation RemoveProject($id: ID!) {\n        removeProject(id: $id)\n    }\n": types.RemoveProjectDocument,
    "\n    mutation RemoveProjects($ids: [ID!]!) {\n        removeProjects(ids: $ids)\n    }\n": types.RemoveProjectsDocument,
    "\n    mutation CreateProject($createProjectInput: CreateProjectInput!) {\n        createProject(createProjectInput: $createProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.CreateProjectDocument,
    "\n    query GetRoles {\n    roles {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n}\n": types.GetRolesDocument,
    "\n    query GetRole($id: ID!) {\n      role(id: $id) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n    }\n": types.GetRoleDocument,
    "\n    query GetResources {\n        permissions {\n            resource\n            actions\n        }\n}\n": types.GetResourcesDocument,
    "\n    mutation CreateRole($createRoleInput: CreateRoleInput!) {\n      createRole(createRoleInput: $createRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n": types.CreateRoleDocument,
    "\n    mutation RemoveRole($id: ID!) {\n      removeRole(id: $id)\n    }\n": types.RemoveRoleDocument,
    "\n    mutation RemoveRoles($ids: [ID!]!) {\n      removeRoles(ids: $ids)\n    }\n": types.RemoveRolesDocument,
    "\n    mutation UpdateRole($updateRoleInput: UpdateRoleInput!) {\n      updateRole(updateRoleInput: $updateRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n": types.UpdateRoleDocument,
    "\n    query GetSliders {\n    sliders {\n        id\n        sliderImage\n        sliderName\n        sliderText\n    }\n}\n": types.GetSlidersDocument,
    "\n    query GetSlider($id: ID!) {\n      slider(id: $id) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n        }\n    }\n": types.GetSliderDocument,
    "\n    mutation CreateSlider($createSliderInput: CreateSliderInput!) {\n      createSlider(createSliderInput: $createSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": types.CreateSliderDocument,
    "\n    mutation RemoveSlider($id: ID!) {\n      removeSlider(id: $id)\n    }\n": types.RemoveSliderDocument,
    "\n    mutation RemoveSliders($ids: [ID!]!) {\n      removeSliders(ids: $ids)\n    }\n": types.RemoveSlidersDocument,
    "\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n": types.UpdateSliderDocument,
    "\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n": types.GetTechCategoriesDocument,
    "\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n": types.GetTechCategoryDocument,
    "\n    mutation CreateTechCategory($createTechCategoryInput: CreateTechCategoryInput!) {\n        createTechCategory(createTechCategoryInput: $createTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n": types.CreateTechCategoryDocument,
    "\n    mutation RemoveTechCategory($id: ID!) {\n        removeTechCategory(id: $id)\n    }\n": types.RemoveTechCategoryDocument,
    "\n    mutation RemoveTechCategories($ids: [ID!]!) {\n        removeTechCategories(ids: $ids)\n    }\n": types.RemoveTechCategoriesDocument,
    "\n    mutation UpdateTechCategory($updateTechCategoryInput: UpdateTechCategoryInput!) {\n        updateTechCategory(updateTechCategoryInput: $updateTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n": types.UpdateTechCategoryDocument,
    "\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n": types.GetProjectsByTechStackDocument,
    "\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": types.GetTechStacksDocument,
    "\nquery TechstackPagination($limit: Int, $page: Int, $categoryId: ID) {\n    techstackPagination(limit: $limit, page: $page, categoryId: $categoryId) {\n        limit\n        page\n        total\n        totalPages\n        items {\n            id\n            techName\n            techSvg\n        }\n    }\n}": types.TechstackPaginationDocument,
    "\n    mutation CreateTechStack($createTechStackInput: CreateTechStackInput!) {\n        createTechStack(createTechStackInput: $createTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": types.CreateTechStackDocument,
    "\n    mutation UpdateTechStack($updateTechStackInput: UpdateTechStackInput!) {\n        updateTechStack(updateTechStackInput: $updateTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": types.UpdateTechStackDocument,
    "\n    mutation DeleteTechStack($id: ID!) {\n        removeTechStack(id: $id)\n    }\n": types.DeleteTechStackDocument,
    "\n    mutation DeleteTechStacks($ids: [ID!]!) {\n        removeTechStacks(ids: $ids)\n    }\n": types.DeleteTechStacksDocument,
    "\n    query GetTechStack($id: ID!) {\n        techstack(id: $id) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n": types.GetTechStackDocument,
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
export function graphql(source: "\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput) {\n        login\n        success\n        message\n    }\n}\n"): (typeof documents)["\n    mutation Signup($signUpInput: SignUpInput!) {\n    signup(signUpInput: $signUpInput) {\n        login\n        success\n        message\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RefreshTheTokens {\n    refreshTheTokens {\n        tokens {\n            accessToken\n        }\n    }\n}\n"): (typeof documents)["\nmutation RefreshTheTokens {\n    refreshTheTokens {\n        tokens {\n            accessToken\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n"): (typeof documents)["\n    mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n        tokens {\n            accessToken\n        }\n        user {\n            login\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            id\n            name\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}"): (typeof documents)["\n    mutation GetUser {\n    getUser {\n        id\n        login\n        name\n        avatarPhoto\n        role {\n            id\n            name\n            permissions {\n                actions\n                resource\n            }\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUsers {\n    users {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n"): (typeof documents)["\n    query GetUsers {\n    users {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n        avatarPhoto\n        id\n        login\n        name\n    }\n}"): (typeof documents)["\n    mutation UpdateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n        avatarPhoto\n        id\n        login\n        name\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AttachRoleToUser($attachRoleInput: AttachRoleInput!) {\n    attachRole(attachRoleInput: $attachRoleInput) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n"): (typeof documents)["\n    mutation AttachRoleToUser($attachRoleInput: AttachRoleInput!) {\n    attachRole(attachRoleInput: $attachRoleInput) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteUser($id: ID!) {\n    removeUser(id: $id) \n}\n"): (typeof documents)["\n    mutation DeleteUser($id: ID!) {\n    removeUser(id: $id) \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteUsers($ids: [ID!]!) {\n    removeUsers(ids: $ids) \n}\n"): (typeof documents)["\n    mutation DeleteUsers($ids: [ID!]!) {\n    removeUsers(ids: $ids) \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOneUser($id: ID!) {\n    userById(id: $id) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n"): (typeof documents)["\n    query GetOneUser($id: ID!) {\n    userById(id: $id) {\n        id\n        login\n        name\n        avatarPhoto\n        isEmailVerified\n        role {\n            id\n            name\n            permissions {\n                actions\n                id\n                resource\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Logout {\n    logout\n}\n"): (typeof documents)["\n    mutation Logout {\n    logout\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n"): (typeof documents)["\n    query GetCertificates {\n    certificates {\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        certificateCompany\n        id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCertificate($id: ID!) {\n      certificate(id: $id) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n        }\n    }\n"): (typeof documents)["\n    query GetCertificate($id: ID!) {\n      certificate(id: $id) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateCertificate($createCertificateInput: CreateCertificateInput!) {\n      createCertificate(createCertificateInput: $createCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateCertificate($createCertificateInput: CreateCertificateInput!) {\n      createCertificate(createCertificateInput: $createCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveCertificate($id: ID!) {\n      removeCertificate(id: $id)\n    }\n"): (typeof documents)["\n    mutation RemoveCertificate($id: ID!) {\n      removeCertificate(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveCertificates($ids: [ID!]!) {\n      removeCertificates(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation RemoveCertificates($ids: [ID!]!) {\n      removeCertificates(ids: $ids)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateCertificate($updateCertificateInput: UpdateCertificateInput!) {\n      updateCertificate(updateCertificateInput: $updateCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateCertificate($updateCertificateInput: UpdateCertificateInput!) {\n      updateCertificate(updateCertificateInput: $updateCertificateInput) {\n        certificateCompany\n        certificateDescription\n        certificateImage\n        certificateLink\n        certificatePeriodEnd\n        certificatePeriodStart\n        certificateTitle\n        id\n      }\n    }\n"];
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
export function graphql(source: "\n    mutation RemoveContacts($ids: [ID!]!) {\n      removeContacts(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation RemoveContacts($ids: [ID!]!) {\n      removeContacts(ids: $ids)\n    }\n"];
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
export function graphql(source: "\n    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {\n        updateProfile(updateProfileInput: $updateProfileInput) {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {\n        updateProfile(updateProfileInput: $updateProfileInput) {\n            id\n            name\n            surname\n            profilePhotos\n            typingText\n            email\n            phone\n            location\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetProjects {\n        projects {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProjectsPagination($limit: Int!, $page: Int!, $techId: ID) {\n        projectsPagination(limit: $limit, page: $page, techId: $techId) {\n         limit\n         page\n         total\n         totalPages\n         items {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n          }\n        }\n    }\n"): (typeof documents)["\n    query GetProjectsPagination($limit: Int!, $page: Int!, $techId: ID) {\n        projectsPagination(limit: $limit, page: $page, techId: $techId) {\n         limit\n         page\n         total\n         totalPages\n         items {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n          }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetProject($id: ID!) {\n        project(id: $id) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetProject($id: ID!) {\n        project(id: $id) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {\n        updateProject(updateProjectInput: $updateProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {\n        updateProject(updateProjectInput: $updateProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveProject($id: ID!) {\n        removeProject(id: $id)\n    }\n"): (typeof documents)["\n    mutation RemoveProject($id: ID!) {\n        removeProject(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveProjects($ids: [ID!]!) {\n        removeProjects(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation RemoveProjects($ids: [ID!]!) {\n        removeProjects(ids: $ids)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateProject($createProjectInput: CreateProjectInput!) {\n        createProject(createProjectInput: $createProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateProject($createProjectInput: CreateProjectInput!) {\n        createProject(createProjectInput: $createProjectInput) {\n            id\n            projectDemoLink\n            projectDescription\n            projectGithubLink\n            projectImages\n            projectTitle\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetRoles {\n    roles {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n}\n"): (typeof documents)["\n    query GetRoles {\n    roles {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetRole($id: ID!) {\n      role(id: $id) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n    }\n"): (typeof documents)["\n    query GetRole($id: ID!) {\n      role(id: $id) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetResources {\n        permissions {\n            resource\n            actions\n        }\n}\n"): (typeof documents)["\n    query GetResources {\n        permissions {\n            resource\n            actions\n        }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateRole($createRoleInput: CreateRoleInput!) {\n      createRole(createRoleInput: $createRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n"): (typeof documents)["\n    mutation CreateRole($createRoleInput: CreateRoleInput!) {\n      createRole(createRoleInput: $createRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveRole($id: ID!) {\n      removeRole(id: $id)\n    }\n"): (typeof documents)["\n    mutation RemoveRole($id: ID!) {\n      removeRole(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveRoles($ids: [ID!]!) {\n      removeRoles(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation RemoveRoles($ids: [ID!]!) {\n      removeRoles(ids: $ids)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateRole($updateRoleInput: UpdateRoleInput!) {\n      updateRole(updateRoleInput: $updateRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateRole($updateRoleInput: UpdateRoleInput!) {\n      updateRole(updateRoleInput: $updateRoleInput) {\n        id\n        name\n        permissions {\n            resource\n            actions\n        }\n        users {\n            id\n            login\n            name\n        }\n      }\n    }\n"];
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
export function graphql(source: "\n    mutation RemoveSliders($ids: [ID!]!) {\n      removeSliders(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation RemoveSliders($ids: [ID!]!) {\n      removeSliders(ids: $ids)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {\n      updateSlider(updateSliderInput: $updateSliderInput) {\n        id\n        sliderImage\n        sliderName\n        sliderText\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetTechCategories {\n        techCategories {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetTechCategory($id: ID!) {\n        techCategory(id: $id) {\n            categoryName\n            id\n            techStacks {\n                id\n                techName\n                techSvg\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateTechCategory($createTechCategoryInput: CreateTechCategoryInput!) {\n        createTechCategory(createTechCategoryInput: $createTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateTechCategory($createTechCategoryInput: CreateTechCategoryInput!) {\n        createTechCategory(createTechCategoryInput: $createTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveTechCategory($id: ID!) {\n        removeTechCategory(id: $id)\n    }\n"): (typeof documents)["\n    mutation RemoveTechCategory($id: ID!) {\n        removeTechCategory(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveTechCategories($ids: [ID!]!) {\n        removeTechCategories(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation RemoveTechCategories($ids: [ID!]!) {\n        removeTechCategories(ids: $ids)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateTechCategory($updateTechCategoryInput: UpdateTechCategoryInput!) {\n        updateTechCategory(updateTechCategoryInput: $updateTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateTechCategory($updateTechCategoryInput: UpdateTechCategoryInput!) {\n        updateTechCategory(updateTechCategoryInput: $updateTechCategoryInput) {\n            id\n            categoryName\n            techStacks {\n                id\n                techName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetProjectsByTechStack($id: ID!) {\n\t\ttechstack(id: $id) {\n\t\t\tid\n            techName\n            techSvg\n            projects {\n                id\n                projectDemoLink\n                projectDescription\n                projectGithubLink\n                projectImages\n                projectTitle\n                techStacks {\n                    id\n                    techName\n                    techSvg\n                }\n            }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetTechStacks {\n        techstacks {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery TechstackPagination($limit: Int, $page: Int, $categoryId: ID) {\n    techstackPagination(limit: $limit, page: $page, categoryId: $categoryId) {\n        limit\n        page\n        total\n        totalPages\n        items {\n            id\n            techName\n            techSvg\n        }\n    }\n}"): (typeof documents)["\nquery TechstackPagination($limit: Int, $page: Int, $categoryId: ID) {\n    techstackPagination(limit: $limit, page: $page, categoryId: $categoryId) {\n        limit\n        page\n        total\n        totalPages\n        items {\n            id\n            techName\n            techSvg\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateTechStack($createTechStackInput: CreateTechStackInput!) {\n        createTechStack(createTechStackInput: $createTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateTechStack($createTechStackInput: CreateTechStackInput!) {\n        createTechStack(createTechStackInput: $createTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateTechStack($updateTechStackInput: UpdateTechStackInput!) {\n        updateTechStack(updateTechStackInput: $updateTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateTechStack($updateTechStackInput: UpdateTechStackInput!) {\n        updateTechStack(updateTechStackInput: $updateTechStackInput) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteTechStack($id: ID!) {\n        removeTechStack(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteTechStack($id: ID!) {\n        removeTechStack(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteTechStacks($ids: [ID!]!) {\n        removeTechStacks(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation DeleteTechStacks($ids: [ID!]!) {\n        removeTechStacks(ids: $ids)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTechStack($id: ID!) {\n        techstack(id: $id) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetTechStack($id: ID!) {\n        techstack(id: $id) {\n            id\n            techName\n            techSvg\n            projects {\n                id\n                projectTitle\n            }\n            techCategories {\n                id\n                categoryName\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;