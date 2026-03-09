import { create } from "domain";
import form from "../form/form";
import schema from "@/validation/schemaValidation";
import { createContactAction } from "@/app/actions/contacts";

export enum Resource {
  PROJECT = 'project',
  SLIDER = 'slider',
  CERTIFICATE = 'certificate',
  CONTACT = 'contact',
  TECHSTACK = 'techstack',
  USER = 'user',
  PROFILE = 'profile',
}

export enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

const adminVariables = {
  searchParamResourse: 'resource',
  pathAdminPage: '/admin/dashboard',
}

const resourceConfig = {
  [Resource.PROJECT]: {
    id: 'admin-project',
    title: 'Projects',
    icon: '/svg/project.svg',
    path: `${adminVariables.pathAdminPage}?${adminVariables.searchParamResourse}=${Resource.PROJECT}`,
    editForm: form.projectForm,
    createForm: {
      inputs: form.projectForm.inputsAdd,
      initialValues: form.projectForm.initialValues,
      action: null,
      schema: schema.project,
    },
    validationSchema: schema.project,
    form: form.projectForm,
    actionCreate: null
  },
  [Resource.SLIDER]: {
    id: 'admin-slider',
    title: 'Sliders',
    icon: '/svg/slider.svg',
    path: `${adminVariables.pathAdminPage}?${adminVariables.searchParamResourse}=${Resource.SLIDER}`,
    editForm: form.sliderForm,
    createForm: {
      inputs: form.sliderForm.inputsAdd,
      initialValues: form.sliderForm.initialValues,
      action: null,
      schema: schema.slider,
    },
    validationSchema: schema.slider,
    form: form.sliderForm,
    actionCreate: null
  },
  [Resource.CERTIFICATE]: {
    id: 'admin-certificates',
    title: 'Certificates',
    icon: '/svg/certificate.svg',
    path: `${adminVariables.pathAdminPage}?${adminVariables.searchParamResourse}=${Resource.CERTIFICATE}`,
    editForm: null,
    createForm: {
      inputs: null,
      initialValues: null,
      action: null,
      schema: null,
    },
    validationSchema: null,
    form: null,
    actionCreate: null
  },
  [Resource.CONTACT]: {
    id: 'admin-contacts',
    title: 'Contacts',
    icon: '/svg/contact.svg',
    path: `${adminVariables.pathAdminPage}?${adminVariables.searchParamResourse}=${Resource.CONTACT}`,
    editForm: form.contactsForm,
    createForm: {
      inputs: form.contactsForm.inputsAdd,
      initialValues: form.contactsForm.initialValues,
      action: createContactAction,
      schema: schema.contact.contactAdd,
    },
    validationSchema: schema.contact,
    form: form.contactsForm,
  },
  [Resource.TECHSTACK]: {
    id: 'admin-techstack',
    title: 'Tech Stack',
    icon: '/svg/tech.svg',
    path: `${adminVariables.pathAdminPage}?${adminVariables.searchParamResourse}=${Resource.TECHSTACK}`,
    editForm: null,
    createForm: {
      inputs: null,
      initialValues: null,
      action: null,
      schema: null,
    },
    validationSchema: null,
    form: null,
    actionCreate: null
  },
  [Resource.USER]: {
    id: 'admin-users',
    title: 'Users',
    icon: '/svg/user.svg',
    path: `${adminVariables.pathAdminPage}?${adminVariables.searchParamResourse}=${Resource.USER}`,
    editForm: null,
    createForm: null,
    validationSchema: null,
    form: null,
    actionCreate: null
  },
  [Resource.PROFILE]: {
    id: 'admin-profile',
    title: 'Profile',
    icon: '/svg/profile.svg',
    path: `${adminVariables.pathAdminPage}?${adminVariables.searchParamResourse}=${Resource.PROFILE}`,
    editForm: form.profileForm,
    createForm: null,
    validationSchema: schema.profile,
    form: form.profileForm,
    actionCreate: null
  },
};


export { resourceConfig, adminVariables }

