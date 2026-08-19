/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export type AttachRoleInput = {
  roleId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Certificate = {
  __typename?: 'Certificate';
  /** Certificate company where the course work was done */
  certificateCompany?: Maybe<Scalars['String']['output']>;
  /** Certificate description */
  certificateDescription: Scalars['String']['output'];
  /** Certificate image on which will be certificate text */
  certificateImage?: Maybe<Scalars['String']['output']>;
  /** Certificate link */
  certificateLink?: Maybe<Scalars['String']['output']>;
  /** Certificate period end date */
  certificatePeriodEnd: Scalars['Date']['output'];
  /** Certificate period start date */
  certificatePeriodStart: Scalars['Date']['output'];
  /** Certificate title */
  certificateTitle: Scalars['String']['output'];
  /** Certificate unique identifier */
  id: Scalars['ID']['output'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type Contact = {
  __typename?: 'Contact';
  /** Contact link */
  contactLink: Scalars['String']['output'];
  /** Contact name */
  contactName: Scalars['String']['output'];
  /** Contact svg */
  contactSvg?: Maybe<Scalars['String']['output']>;
  /** Contact id */
  id: Scalars['ID']['output'];
};

export type CookiesData = {
  __typename?: 'CookiesData';
  /** Sign tokens */
  tokens: Sign;
  /** User data */
  user: User;
};

export type CreateCertificateInput = {
  /** Certificate company where the course/work was done */
  certificateCompany?: InputMaybe<Scalars['String']['input']>;
  /** Certificate description */
  certificateDescription: Scalars['String']['input'];
  /** Certificate image on which will be certificate text */
  certificateImage?: InputMaybe<Scalars['String']['input']>;
  /** Certificate link */
  certificateLink?: InputMaybe<Scalars['String']['input']>;
  /** Certificate period end date */
  certificatePeriodEnd: Scalars['Date']['input'];
  /** Certificate period start date */
  certificatePeriodStart: Scalars['Date']['input'];
  /** Certificate title */
  certificateTitle: Scalars['String']['input'];
};

export type CreateContactInput = {
  contactLink: Scalars['String']['input'];
  contactName: Scalars['String']['input'];
  contactSvg?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePermissionInput = {
  actions: Array<Scalars['String']['input']>;
  resource: Scalars['String']['input'];
};

export type CreateProjectInput = {
  projectDemoLink: Scalars['String']['input'];
  projectDescription: Scalars['String']['input'];
  projectGithubLink: Scalars['String']['input'];
  projectImages?: InputMaybe<Array<Scalars['String']['input']>>;
  projectTitle: Scalars['String']['input'];
  techStacks?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateRoleInput = {
  name: Scalars['String']['input'];
  permissions: Array<CreatePermissionInput>;
};

export type CreateSliderInput = {
  sliderImage?: InputMaybe<Scalars['String']['input']>;
  sliderName: Scalars['String']['input'];
  sliderText: Scalars['String']['input'];
};

export type CreateTechCategoryInput = {
  categoryName: Scalars['String']['input'];
  techStacks?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateTechStackInput = {
  projects?: InputMaybe<Array<Scalars['String']['input']>>;
  techCategories?: InputMaybe<Array<Scalars['String']['input']>>;
  techName: Scalars['String']['input'];
  techSvg?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  attachRole: User;
  changePassword: User;
  createCertificate: Certificate;
  createContact: Contact;
  createProject: Project;
  createRole: Role;
  createSlider: Slider;
  createTechCategory: TechCategory;
  createTechStack: TechStack;
  getUser: User;
  login: CookiesData;
  logout: Scalars['Boolean']['output'];
  refreshTheTokens: CookiesData;
  removeCertificate: Scalars['ID']['output'];
  removeCertificates: Array<Scalars['ID']['output']>;
  removeContact: Scalars['ID']['output'];
  removeContacts: Array<Scalars['ID']['output']>;
  removeProject: Scalars['ID']['output'];
  removeProjects: Array<Scalars['ID']['output']>;
  removeRole: Scalars['ID']['output'];
  removeRoles: Array<Scalars['ID']['output']>;
  removeSlider: Scalars['ID']['output'];
  removeSliders: Array<Scalars['ID']['output']>;
  removeTechCategories: Array<Scalars['ID']['output']>;
  removeTechCategory: Scalars['ID']['output'];
  removeTechStack: Scalars['ID']['output'];
  removeTechStacks: Array<Scalars['ID']['output']>;
  removeUser: Scalars['ID']['output'];
  removeUsers: Array<Scalars['ID']['output']>;
  signup: Scalars['Boolean']['output'];
  update: User;
  updateCertificate: Certificate;
  updateContact: Contact;
  updateProfile: Profile;
  updateProject: Project;
  updateRole: Role;
  updateSlider: Slider;
  updateTechCategory: TechCategory;
  updateTechStack: TechStack;
};


export type MutationAttachRoleArgs = {
  attachRoleInput: AttachRoleInput;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationCreateCertificateArgs = {
  createCertificateInput: CreateCertificateInput;
};


export type MutationCreateContactArgs = {
  createContactInput: CreateContactInput;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateSliderArgs = {
  createSliderInput: CreateSliderInput;
};


export type MutationCreateTechCategoryArgs = {
  createTechCategoryInput: CreateTechCategoryInput;
};


export type MutationCreateTechStackArgs = {
  createTechStackInput: CreateTechStackInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveCertificateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCertificatesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveContactsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProjectsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRolesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveSliderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSlidersArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveTechCategoriesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveTechCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTechStackArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTechStacksArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUsersArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdateArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateCertificateArgs = {
  updateCertificateInput: UpdateCertificateInput;
};


export type MutationUpdateContactArgs = {
  updateContactInput: UpdateContactInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateSliderArgs = {
  updateSliderInput: UpdateSliderInput;
};


export type MutationUpdateTechCategoryArgs = {
  updateTechCategoryInput: UpdateTechCategoryInput;
};


export type MutationUpdateTechStackArgs = {
  updateTechStackInput: UpdateTechStackInput;
};

export type Permission = {
  __typename?: 'Permission';
  /** Permission actions example: [create, read, update, delete] */
  actions: Array<Scalars['String']['output']>;
  /** Permission id */
  id: Scalars['ID']['output'];
  /** Permission resource example: user */
  resource: Scalars['String']['output'];
  /** Permission role */
  role: Role;
};

export type Profile = {
  __typename?: 'Profile';
  /** Profile email */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Profile location */
  location: Scalars['String']['output'];
  /** Profile name */
  name: Scalars['String']['output'];
  /** Profile phone */
  phone: Scalars['String']['output'];
  /** Profile photos */
  profilePhotos?: Maybe<Array<Scalars['String']['output']>>;
  /** Profile surname */
  surname: Scalars['String']['output'];
  /** Profile text on main page */
  typingText: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  /** Project id */
  id: Scalars['ID']['output'];
  /** Project demo link */
  projectDemoLink: Scalars['String']['output'];
  /** Project description */
  projectDescription: Scalars['String']['output'];
  /** Project github link */
  projectGithubLink: Scalars['String']['output'];
  /** Project images */
  projectImages?: Maybe<Array<Scalars['String']['output']>>;
  /** Project title */
  projectTitle: Scalars['String']['output'];
  /** Project tech stacks */
  techStacks?: Maybe<Array<TechStack>>;
};

export type Query = {
  __typename?: 'Query';
  certificate: Certificate;
  certificates: Array<Certificate>;
  contact: Contact;
  contacts: Array<Contact>;
  permissions: Array<AllPermission>;
  profile: Profile;
  project: Project;
  projects: Array<Project>;
  role: Role;
  roles: Array<Role>;
  slider: Slider;
  sliders: Array<Slider>;
  techCategories: Array<TechCategory>;
  techCategory: TechCategory;
  techstack: TechStack;
  techstacks: Array<TechStack>;
  user: User;
  userById: User;
  users: Array<User>;
};


export type QueryCertificateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySliderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTechCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTechstackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  login: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  /** Refresh token expiry date */
  expiryDate: Scalars['String']['output'];
  /** Refresh token id */
  id: Scalars['ID']['output'];
  /** Refresh token */
  token: Scalars['String']['output'];
  user: User;
};

export type Role = {
  __typename?: 'Role';
  /** Role id */
  id: Scalars['ID']['output'];
  /** Role name */
  name: Scalars['String']['output'];
  /** Role permissions */
  permissions: Array<Permission>;
  /** Role users */
  users?: Maybe<Array<User>>;
};

export type Sign = {
  __typename?: 'Sign';
  /** Access token */
  accessToken: Scalars['String']['output'];
};

export type SignUpInput = {
  avatarPhoto?: InputMaybe<Scalars['String']['input']>;
  login: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Slider = {
  __typename?: 'Slider';
  /** Slider unique identifier */
  id: Scalars['ID']['output'];
  /** Slider image on which will be slider text */
  sliderImage?: Maybe<Scalars['String']['output']>;
  /** Slider title will be on main slider */
  sliderName: Scalars['String']['output'];
  /** Slider text will be on main slider */
  sliderText: Scalars['String']['output'];
};

export type TechCategory = {
  __typename?: 'TechCategory';
  /** Tech category name for example: Frontend */
  categoryName: Scalars['String']['output'];
  /** Tech category id */
  id: Scalars['ID']['output'];
  techStacks?: Maybe<Array<TechStack>>;
};

export type TechStack = {
  __typename?: 'TechStack';
  /** Tech stack id */
  id: Scalars['ID']['output'];
  projects?: Maybe<Array<Project>>;
  /** Tech categories for example: Frontend, Backend */
  techCategories?: Maybe<Array<TechCategory>>;
  /** Tech stack name for example: React */
  techName: Scalars['String']['output'];
  /** Tech stack svg for example: React svg */
  techSvg?: Maybe<Scalars['String']['output']>;
};

export type UpdateCertificateInput = {
  /** Certificate company where the course/work was done */
  certificateCompany?: InputMaybe<Scalars['String']['input']>;
  /** Certificate description */
  certificateDescription?: InputMaybe<Scalars['String']['input']>;
  /** Certificate image on which will be certificate text */
  certificateImage?: InputMaybe<Scalars['String']['input']>;
  /** Certificate link */
  certificateLink?: InputMaybe<Scalars['String']['input']>;
  /** Certificate period end date */
  certificatePeriodEnd?: InputMaybe<Scalars['Date']['input']>;
  /** Certificate period start date */
  certificatePeriodStart?: InputMaybe<Scalars['Date']['input']>;
  /** Certificate title */
  certificateTitle?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateContactInput = {
  contactLink?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactSvg?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profilePhotos?: InputMaybe<Array<Scalars['String']['input']>>;
  surname?: InputMaybe<Scalars['String']['input']>;
  typingText?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  id: Scalars['ID']['input'];
  projectDemoLink?: InputMaybe<Scalars['String']['input']>;
  projectDescription?: InputMaybe<Scalars['String']['input']>;
  projectGithubLink?: InputMaybe<Scalars['String']['input']>;
  projectImages?: InputMaybe<Array<Scalars['String']['input']>>;
  projectTitle?: InputMaybe<Scalars['String']['input']>;
  techStacks?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateRoleInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<CreatePermissionInput>>;
};

export type UpdateSliderInput = {
  id: Scalars['ID']['input'];
  sliderImage?: InputMaybe<Scalars['String']['input']>;
  sliderName?: InputMaybe<Scalars['String']['input']>;
  sliderText?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTechCategoryInput = {
  categoryName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  techStacks?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateTechStackInput = {
  id: Scalars['ID']['input'];
  projects?: InputMaybe<Array<Scalars['String']['input']>>;
  techCategories?: InputMaybe<Array<Scalars['String']['input']>>;
  techName?: InputMaybe<Scalars['String']['input']>;
  techSvg?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  /** User url image */
  avatarPhoto?: Maybe<Scalars['String']['output']>;
  /** Google id */
  googleId?: Maybe<Scalars['String']['output']>;
  /** User id */
  id: Scalars['ID']['output'];
  /** Email verification status */
  isEmailVerified: Scalars['Boolean']['output'];
  /** User login */
  login: Scalars['String']['output'];
  /** User name */
  name: Scalars['String']['output'];
  /** User password */
  password?: Maybe<Scalars['String']['output']>;
  /** Auth provider */
  provider: UserProvider;
  /** Refresh token */
  refreshToken?: Maybe<RefreshToken>;
  /** User role */
  role?: Maybe<Role>;
  /** User surname */
  verificationToken?: Maybe<Scalars['String']['output']>;
};

/** Authentication provider type */
export enum UserProvider {
  Both = 'BOTH',
  Google = 'GOOGLE',
  Local = 'LOCAL'
}

export type AllPermission = {
  __typename?: 'allPermission';
  /** Permission actions example: [create, read, update, delete] */
  actions: Array<Scalars['String']['output']>;
  /** Permission resource example: user */
  resource: Scalars['String']['output'];
};

export type SignupMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: boolean };

export type RefreshTheTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTheTokensMutation = { __typename?: 'Mutation', refreshTheTokens: { __typename?: 'CookiesData', tokens: { __typename?: 'Sign', accessToken: string } } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'CookiesData', tokens: { __typename?: 'Sign', accessToken: string }, user: { __typename?: 'User', login: string, name: string } } };

export type GetUserMutationVariables = Exact<{ [key: string]: never; }>;


export type GetUserMutation = { __typename?: 'Mutation', getUser: { __typename?: 'User', id: string, login: string, name: string, avatarPhoto?: string | null, role?: { __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', actions: Array<string>, resource: string }> } | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, login: string, name: string, avatarPhoto?: string | null, isEmailVerified: boolean, role?: { __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', actions: Array<string>, id: string, resource: string }> } | null }> };

export type AttachRoleToUserMutationVariables = Exact<{
  attachRoleInput: AttachRoleInput;
}>;


export type AttachRoleToUserMutation = { __typename?: 'Mutation', attachRole: { __typename?: 'User', id: string, login: string, name: string, avatarPhoto?: string | null, isEmailVerified: boolean, role?: { __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', actions: Array<string>, id: string, resource: string }> } | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', removeUser: string };

export type DeleteUsersMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type DeleteUsersMutation = { __typename?: 'Mutation', removeUsers: Array<string> };

export type GetOneUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOneUserQuery = { __typename?: 'Query', userById: { __typename?: 'User', id: string, login: string, name: string, avatarPhoto?: string | null, isEmailVerified: boolean, role?: { __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', actions: Array<string>, id: string, resource: string }> } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetCertificatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCertificatesQuery = { __typename?: 'Query', certificates: Array<{ __typename?: 'Certificate', certificateDescription: string, certificateImage?: string | null, certificateLink?: string | null, certificatePeriodEnd: any, certificatePeriodStart: any, certificateTitle: string, certificateCompany?: string | null, id: string }> };

export type GetCertificateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCertificateQuery = { __typename?: 'Query', certificate: { __typename?: 'Certificate', certificateCompany?: string | null, certificateDescription: string, certificateImage?: string | null, certificateLink?: string | null, certificatePeriodEnd: any, certificatePeriodStart: any, certificateTitle: string, id: string } };

export type CreateCertificateMutationVariables = Exact<{
  createCertificateInput: CreateCertificateInput;
}>;


export type CreateCertificateMutation = { __typename?: 'Mutation', createCertificate: { __typename?: 'Certificate', certificateCompany?: string | null, certificateDescription: string, certificateImage?: string | null, certificateLink?: string | null, certificatePeriodEnd: any, certificatePeriodStart: any, certificateTitle: string, id: string } };

export type RemoveCertificateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCertificateMutation = { __typename?: 'Mutation', removeCertificate: string };

export type RemoveCertificatesMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveCertificatesMutation = { __typename?: 'Mutation', removeCertificates: Array<string> };

export type UpdateCertificateMutationVariables = Exact<{
  updateCertificateInput: UpdateCertificateInput;
}>;


export type UpdateCertificateMutation = { __typename?: 'Mutation', updateCertificate: { __typename?: 'Certificate', certificateCompany?: string | null, certificateDescription: string, certificateImage?: string | null, certificateLink?: string | null, certificatePeriodEnd: any, certificatePeriodStart: any, certificateTitle: string, id: string } };

export type GetContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', contactLink: string, contactName: string, contactSvg?: string | null, id: string }> };

export type GetContactQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetContactQuery = { __typename?: 'Query', contact: { __typename?: 'Contact', contactLink: string, contactName: string, contactSvg?: string | null, id: string } };

export type CreateContactMutationVariables = Exact<{
  createContactInput: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', contactLink: string, contactName: string, contactSvg?: string | null, id: string } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutation', removeContact: string };

export type RemoveContactsMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveContactsMutation = { __typename?: 'Mutation', removeContacts: Array<string> };

export type UpdateContactMutationVariables = Exact<{
  updateContactInput: UpdateContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'Contact', contactLink: string, contactName: string, contactSvg?: string | null, id: string } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', id: string, name: string, surname: string, profilePhotos?: Array<string> | null, typingText: string, email: string, phone: string, location: string } };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, name: string, surname: string, profilePhotos?: Array<string> | null, typingText: string, email: string, phone: string, location: string } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, projectDemoLink: string, projectDescription: string, projectGithubLink: string, projectImages?: Array<string> | null, projectTitle: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null }> | null }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, projectDemoLink: string, projectDescription: string, projectGithubLink: string, projectImages?: Array<string> | null, projectTitle: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null }> | null } };

export type UpdateProjectMutationVariables = Exact<{
  updateProjectInput: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, projectDemoLink: string, projectDescription: string, projectGithubLink: string, projectImages?: Array<string> | null, projectTitle: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null }> | null } };

export type RemoveProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveProjectMutation = { __typename?: 'Mutation', removeProject: string };

export type RemoveProjectsMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveProjectsMutation = { __typename?: 'Mutation', removeProjects: Array<string> };

export type CreateProjectMutationVariables = Exact<{
  createProjectInput: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, projectDemoLink: string, projectDescription: string, projectGithubLink: string, projectImages?: Array<string> | null, projectTitle: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null }> | null } };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', resource: string, actions: Array<string> }>, users?: Array<{ __typename?: 'User', id: string, login: string, name: string }> | null }> };

export type GetRoleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoleQuery = { __typename?: 'Query', role: { __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', resource: string, actions: Array<string> }>, users?: Array<{ __typename?: 'User', id: string, login: string, name: string }> | null } };

export type GetResourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResourcesQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'allPermission', resource: string, actions: Array<string> }> };

export type CreateRoleMutationVariables = Exact<{
  createRoleInput: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', resource: string, actions: Array<string> }>, users?: Array<{ __typename?: 'User', id: string, login: string, name: string }> | null } };

export type RemoveRoleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', removeRole: string };

export type RemoveRolesMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveRolesMutation = { __typename?: 'Mutation', removeRoles: Array<string> };

export type UpdateRoleMutationVariables = Exact<{
  updateRoleInput: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'Role', id: string, name: string, permissions: Array<{ __typename?: 'Permission', resource: string, actions: Array<string> }>, users?: Array<{ __typename?: 'User', id: string, login: string, name: string }> | null } };

export type GetSlidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSlidersQuery = { __typename?: 'Query', sliders: Array<{ __typename?: 'Slider', id: string, sliderImage?: string | null, sliderName: string, sliderText: string }> };

export type GetSliderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSliderQuery = { __typename?: 'Query', slider: { __typename?: 'Slider', id: string, sliderImage?: string | null, sliderName: string, sliderText: string } };

export type CreateSliderMutationVariables = Exact<{
  createSliderInput: CreateSliderInput;
}>;


export type CreateSliderMutation = { __typename?: 'Mutation', createSlider: { __typename?: 'Slider', id: string, sliderImage?: string | null, sliderName: string, sliderText: string } };

export type RemoveSliderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveSliderMutation = { __typename?: 'Mutation', removeSlider: string };

export type RemoveSlidersMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveSlidersMutation = { __typename?: 'Mutation', removeSliders: Array<string> };

export type UpdateSliderMutationVariables = Exact<{
  updateSliderInput: UpdateSliderInput;
}>;


export type UpdateSliderMutation = { __typename?: 'Mutation', updateSlider: { __typename?: 'Slider', id: string, sliderImage?: string | null, sliderName: string, sliderText: string } };

export type GetTechCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTechCategoriesQuery = { __typename?: 'Query', techCategories: Array<{ __typename?: 'TechCategory', categoryName: string, id: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string }> | null }> };

export type GetTechCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTechCategoryQuery = { __typename?: 'Query', techCategory: { __typename?: 'TechCategory', categoryName: string, id: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null }> | null } };

export type CreateTechCategoryMutationVariables = Exact<{
  createTechCategoryInput: CreateTechCategoryInput;
}>;


export type CreateTechCategoryMutation = { __typename?: 'Mutation', createTechCategory: { __typename?: 'TechCategory', id: string, categoryName: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string }> | null } };

export type RemoveTechCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveTechCategoryMutation = { __typename?: 'Mutation', removeTechCategory: string };

export type RemoveTechCategoriesMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveTechCategoriesMutation = { __typename?: 'Mutation', removeTechCategories: Array<string> };

export type UpdateTechCategoryMutationVariables = Exact<{
  updateTechCategoryInput: UpdateTechCategoryInput;
}>;


export type UpdateTechCategoryMutation = { __typename?: 'Mutation', updateTechCategory: { __typename?: 'TechCategory', id: string, categoryName: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string }> | null } };

export type GetProjectsByTechStackQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectsByTechStackQuery = { __typename?: 'Query', techstack: { __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null, projects?: Array<{ __typename?: 'Project', id: string, projectDemoLink: string, projectDescription: string, projectGithubLink: string, projectImages?: Array<string> | null, projectTitle: string, techStacks?: Array<{ __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null }> | null }> | null } };

export type GetTechStacksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTechStacksQuery = { __typename?: 'Query', techstacks: Array<{ __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null, projects?: Array<{ __typename?: 'Project', id: string, projectTitle: string }> | null, techCategories?: Array<{ __typename?: 'TechCategory', id: string, categoryName: string }> | null }> };

export type CreateTechStackMutationVariables = Exact<{
  createTechStackInput: CreateTechStackInput;
}>;


export type CreateTechStackMutation = { __typename?: 'Mutation', createTechStack: { __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null, projects?: Array<{ __typename?: 'Project', id: string, projectTitle: string }> | null, techCategories?: Array<{ __typename?: 'TechCategory', id: string, categoryName: string }> | null } };

export type UpdateTechStackMutationVariables = Exact<{
  updateTechStackInput: UpdateTechStackInput;
}>;


export type UpdateTechStackMutation = { __typename?: 'Mutation', updateTechStack: { __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null, projects?: Array<{ __typename?: 'Project', id: string, projectTitle: string }> | null, techCategories?: Array<{ __typename?: 'TechCategory', id: string, categoryName: string }> | null } };

export type DeleteTechStackMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTechStackMutation = { __typename?: 'Mutation', removeTechStack: string };

export type DeleteTechStacksMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type DeleteTechStacksMutation = { __typename?: 'Mutation', removeTechStacks: Array<string> };

export type GetTechStackQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTechStackQuery = { __typename?: 'Query', techstack: { __typename?: 'TechStack', id: string, techName: string, techSvg?: string | null, projects?: Array<{ __typename?: 'Project', id: string, projectTitle: string }> | null, techCategories?: Array<{ __typename?: 'TechCategory', id: string, categoryName: string }> | null } };


export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signUpInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpInput"}}}]}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const RefreshTheTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTheTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTheTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTheTokensMutation, RefreshTheTokensMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actions"}},{"kind":"Field","name":{"kind":"Name","value":"resource"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserMutation, GetUserMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actions"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resource"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const AttachRoleToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttachRoleToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attachRoleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AttachRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attachRoleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attachRoleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actions"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resource"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AttachRoleToUserMutation, AttachRoleToUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const DeleteUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteUsersMutation, DeleteUsersMutationVariables>;
export const GetOneUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarPhoto"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actions"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resource"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOneUserQuery, GetOneUserQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetCertificatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCertificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"certificateDescription"}},{"kind":"Field","name":{"kind":"Name","value":"certificateImage"}},{"kind":"Field","name":{"kind":"Name","value":"certificateLink"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"certificateTitle"}},{"kind":"Field","name":{"kind":"Name","value":"certificateCompany"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCertificatesQuery, GetCertificatesQueryVariables>;
export const GetCertificateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCertificate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"certificate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"certificateCompany"}},{"kind":"Field","name":{"kind":"Name","value":"certificateDescription"}},{"kind":"Field","name":{"kind":"Name","value":"certificateImage"}},{"kind":"Field","name":{"kind":"Name","value":"certificateLink"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"certificateTitle"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCertificateQuery, GetCertificateQueryVariables>;
export const CreateCertificateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCertificate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCertificateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCertificateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCertificate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCertificateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCertificateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"certificateCompany"}},{"kind":"Field","name":{"kind":"Name","value":"certificateDescription"}},{"kind":"Field","name":{"kind":"Name","value":"certificateImage"}},{"kind":"Field","name":{"kind":"Name","value":"certificateLink"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"certificateTitle"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCertificateMutation, CreateCertificateMutationVariables>;
export const RemoveCertificateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCertificate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCertificate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveCertificateMutation, RemoveCertificateMutationVariables>;
export const RemoveCertificatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCertificates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCertificates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RemoveCertificatesMutation, RemoveCertificatesMutationVariables>;
export const UpdateCertificateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCertificate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCertificateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCertificateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCertificate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCertificateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCertificateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"certificateCompany"}},{"kind":"Field","name":{"kind":"Name","value":"certificateDescription"}},{"kind":"Field","name":{"kind":"Name","value":"certificateImage"}},{"kind":"Field","name":{"kind":"Name","value":"certificateLink"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"certificatePeriodStart"}},{"kind":"Field","name":{"kind":"Name","value":"certificateTitle"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCertificateMutation, UpdateCertificateMutationVariables>;
export const GetContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactLink"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactSvg"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetContactsQuery, GetContactsQueryVariables>;
export const GetContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactLink"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactSvg"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetContactQuery, GetContactQueryVariables>;
export const CreateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createContactInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createContactInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createContactInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactLink"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactSvg"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateContactMutation, CreateContactMutationVariables>;
export const RemoveContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveContactMutation, RemoveContactMutationVariables>;
export const RemoveContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveContacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RemoveContactsMutation, RemoveContactsMutationVariables>;
export const UpdateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateContactInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateContactInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateContactInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactLink"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactSvg"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateContactMutation, UpdateContactMutationVariables>;
export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotos"}},{"kind":"Field","name":{"kind":"Name","value":"typingText"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProfileInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProfileInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotos"}},{"kind":"Field","name":{"kind":"Name","value":"typingText"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectDemoLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectDescription"}},{"kind":"Field","name":{"kind":"Name","value":"projectGithubLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectImages"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectDemoLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectDescription"}},{"kind":"Field","name":{"kind":"Name","value":"projectGithubLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectImages"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectQuery, GetProjectQueryVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateProjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectDemoLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectDescription"}},{"kind":"Field","name":{"kind":"Name","value":"projectGithubLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectImages"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const RemoveProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveProjectMutation, RemoveProjectMutationVariables>;
export const RemoveProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RemoveProjectsMutation, RemoveProjectsMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createProjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createProjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectDemoLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectDescription"}},{"kind":"Field","name":{"kind":"Name","value":"projectGithubLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectImages"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resource"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const GetRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resource"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoleQuery, GetRoleQueryVariables>;
export const GetResourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resource"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]}}]} as unknown as DocumentNode<GetResourcesQuery, GetResourcesQueryVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRoleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRoleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRoleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resource"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const RemoveRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveRoleMutation, RemoveRoleMutationVariables>;
export const RemoveRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RemoveRolesMutation, RemoveRolesMutationVariables>;
export const UpdateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateRoleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateRoleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateRoleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resource"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const GetSlidersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSliders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sliders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sliderImage"}},{"kind":"Field","name":{"kind":"Name","value":"sliderName"}},{"kind":"Field","name":{"kind":"Name","value":"sliderText"}}]}}]}}]} as unknown as DocumentNode<GetSlidersQuery, GetSlidersQueryVariables>;
export const GetSliderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSlider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sliderImage"}},{"kind":"Field","name":{"kind":"Name","value":"sliderName"}},{"kind":"Field","name":{"kind":"Name","value":"sliderText"}}]}}]}}]} as unknown as DocumentNode<GetSliderQuery, GetSliderQueryVariables>;
export const CreateSliderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSlider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSliderInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSliderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSlider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSliderInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSliderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sliderImage"}},{"kind":"Field","name":{"kind":"Name","value":"sliderName"}},{"kind":"Field","name":{"kind":"Name","value":"sliderText"}}]}}]}}]} as unknown as DocumentNode<CreateSliderMutation, CreateSliderMutationVariables>;
export const RemoveSliderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSlider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSlider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveSliderMutation, RemoveSliderMutationVariables>;
export const RemoveSlidersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSliders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSliders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RemoveSlidersMutation, RemoveSlidersMutationVariables>;
export const UpdateSliderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSlider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSliderInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSliderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSlider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateSliderInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSliderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sliderImage"}},{"kind":"Field","name":{"kind":"Name","value":"sliderName"}},{"kind":"Field","name":{"kind":"Name","value":"sliderText"}}]}}]}}]} as unknown as DocumentNode<UpdateSliderMutation, UpdateSliderMutationVariables>;
export const GetTechCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTechCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"techCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}}]}}]}}]}}]} as unknown as DocumentNode<GetTechCategoriesQuery, GetTechCategoriesQueryVariables>;
export const GetTechCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTechCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"techCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}}]}}]}}]}}]} as unknown as DocumentNode<GetTechCategoryQuery, GetTechCategoryQueryVariables>;
export const CreateTechCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTechCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTechCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTechCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTechCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTechCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTechCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTechCategoryMutation, CreateTechCategoryMutationVariables>;
export const RemoveTechCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTechCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTechCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveTechCategoryMutation, RemoveTechCategoryMutationVariables>;
export const RemoveTechCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTechCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTechCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<RemoveTechCategoriesMutation, RemoveTechCategoriesMutationVariables>;
export const UpdateTechCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTechCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTechCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTechCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTechCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateTechCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTechCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTechCategoryMutation, UpdateTechCategoryMutationVariables>;
export const GetProjectsByTechStackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectsByTechStack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"techstack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectDemoLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectDescription"}},{"kind":"Field","name":{"kind":"Name","value":"projectGithubLink"}},{"kind":"Field","name":{"kind":"Name","value":"projectImages"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}},{"kind":"Field","name":{"kind":"Name","value":"techStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectsByTechStackQuery, GetProjectsByTechStackQueryVariables>;
export const GetTechStacksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTechStacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"techstacks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"techCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}}]}}]}}]}}]} as unknown as DocumentNode<GetTechStacksQuery, GetTechStacksQueryVariables>;
export const CreateTechStackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTechStack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTechStackInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTechStackInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTechStack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTechStackInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTechStackInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"techCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTechStackMutation, CreateTechStackMutationVariables>;
export const UpdateTechStackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTechStack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTechStackInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTechStackInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTechStack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateTechStackInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTechStackInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"techCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTechStackMutation, UpdateTechStackMutationVariables>;
export const DeleteTechStackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTechStack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTechStack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTechStackMutation, DeleteTechStackMutationVariables>;
export const DeleteTechStacksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTechStacks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTechStacks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteTechStacksMutation, DeleteTechStacksMutationVariables>;
export const GetTechStackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTechStack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"techstack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"techName"}},{"kind":"Field","name":{"kind":"Name","value":"techSvg"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectTitle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"techCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"categoryName"}}]}}]}}]}}]} as unknown as DocumentNode<GetTechStackQuery, GetTechStackQueryVariables>;