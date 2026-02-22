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
};

export type AttachRoleInput = {
  roleId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
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

export type CreateTechStackInput = {
  projects?: InputMaybe<Array<Scalars['String']['input']>>;
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
  createContact: Contact;
  createProject: Project;
  createRole: Role;
  createSlider: Slider;
  createTechStack: TechStack;
  getUser: User;
  login: CookiesData;
  logout: Scalars['Boolean']['output'];
  refreshTheTokens: CookiesData;
  removeContact: Scalars['ID']['output'];
  removeProject: Scalars['ID']['output'];
  removeRole: Scalars['ID']['output'];
  removeSlider: Scalars['ID']['output'];
  removeTechStack: Scalars['ID']['output'];
  removeUser: Scalars['ID']['output'];
  signup: CookiesData;
  update: User;
  updateContact: Contact;
  updateProfile: Profile;
  updateProject: Project;
  updateRole: Role;
  updateSlider: Slider;
  updateTechStack: TechStack;
};


export type MutationAttachRoleArgs = {
  attachRoleInput: AttachRoleInput;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
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


export type MutationCreateTechStackArgs = {
  CreateTechStackInput: CreateTechStackInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSliderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTechStackArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdateArgs = {
  updateUserInput: UpdateUserInput;
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


export type MutationUpdateTechStackArgs = {
  UpdateTechStackInput: UpdateTechStackInput;
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
  contact: Contact;
  contacts: Array<Contact>;
  profile: Profile;
  project: Project;
  projects: Array<Project>;
  role: Role;
  roles: Array<Role>;
  slider: Slider;
  sliders: Array<Slider>;
  techstack: TechStack;
  techstacks: Array<TechStack>;
  user: User;
  users: Array<User>;
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


export type QueryTechstackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  login: Scalars['String']['input'];
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

export type TechStack = {
  __typename?: 'TechStack';
  /** Tech stack id */
  id: Scalars['ID']['output'];
  projects: Array<Project>;
  /** Tech stack name for example: React */
  techName: Scalars['String']['output'];
  /** Tech stack svg for example: React svg */
  techSvg?: Maybe<Scalars['String']['output']>;
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
  profilePhoto?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type UpdateTechStackInput = {
  id: Scalars['ID']['input'];
  projects?: InputMaybe<Array<Scalars['String']['input']>>;
  techName?: InputMaybe<Scalars['String']['input']>;
  techSvg?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  /** User id */
  id: Scalars['ID']['output'];
  /** User login */
  login: Scalars['String']['output'];
  /** User name */
  name: Scalars['String']['output'];
  /** User password */
  password?: Maybe<Scalars['String']['output']>;
  /** Refresh token */
  refreshToken?: Maybe<RefreshToken>;
  /** User role */
  role?: Maybe<Role>;
};

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', id: string, name: string, surname: string, profilePhotos?: Array<string> | null, typingText: string, email: string, phone: string, location: string } };

export type GetSlidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSlidersQuery = { __typename?: 'Query', sliders: Array<{ __typename?: 'Slider', id: string, sliderImage?: string | null, sliderName: string, sliderText: string }> };


export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhotos"}},{"kind":"Field","name":{"kind":"Name","value":"typingText"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const GetSlidersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSliders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sliders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sliderImage"}},{"kind":"Field","name":{"kind":"Name","value":"sliderName"}},{"kind":"Field","name":{"kind":"Name","value":"sliderText"}}]}}]}}]} as unknown as DocumentNode<GetSlidersQuery, GetSlidersQueryVariables>;