import form from "../form/form";
import schema from "@/validation/schemaValidation";
import { createContactAction, updateContactAction, updateContactImageAction } from "@/app/actions/contacts";
import { UPLOADSERVICE } from "@/variables/upload/upload";
import { createSliderAction, updateSliderAction, updateSliderImageAction } from "@/app/actions/sliders";
import table from "../table/table";

export enum Resource {
  USER = 'user',
  CONTACT = 'contact',
  PROJECT = 'project',
  TECHSTACK = 'techstack',
  SLIDER = 'slider',
  PROFILE = 'profile',
  ROLE = 'role',
  IMAGE = 'image',
  REFRESH = 'refresh',
  CATEGORY = 'category',
  CERTIFICATE = 'certificate',
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
  pathAdminEdit: '/update'
}

const resourceConfig = {
  [Resource.PROJECT]: {
    id: 'admin-project',
    title: 'Projects',
    icon: '/svg/project.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.PROJECT}`,
    editForm: form.projectForm,
    createForm: {
      inputs: form.projectForm.inputsAdd,
      initialValues: form.projectForm.initialValues,
      action: null,
      schemaKey: 'project.projectAdd',
      title: 'Create project',
      uploadConfig: UPLOADSERVICE.PROJECTS
    },
    validationSchema: schema.project,
    form: form.projectForm,
    actionCreate: null
  },
  [Resource.SLIDER]: {
    id: 'admin-slider',
    title: 'Sliders',
    icon: '/svg/slider.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.SLIDER}`,
    table: {
      table: table.sliderTable
    },
    createForm: {
      inputs: form.sliderForm.inputsAdd,
      initialValues: form.sliderForm.initialValues,
      action: createSliderAction,
      schema: schema.slider.sliderAdd,
      title: 'Create slider',
      uploadConfig: UPLOADSERVICE.SLIDERS,
      link: `${adminVariables.pathAdminPage}/${Resource.SLIDER}/${Action.CREATE}`,
    },
    editFrom: {
      inputs: form.sliderForm.inputsEdit,
      initialValues: form.sliderForm.initialValues,
      action: updateSliderAction,
      schema: schema.slider.sliderEdit,
      title: 'Edit slider',
    },
    editFormImage: {
      inputs: form.sliderForm.inputsEditImage,
      initialValues: form.sliderForm.initialValues,
      action: updateSliderImageAction,
      schema: schema.slider.sliderImage,
      title: 'Edit slider image',
    },
    validationSchema: schema.slider,
    form: form.sliderForm,
  },
  [Resource.CERTIFICATE]: {
    id: 'admin-certificates',
    title: 'Certificates',
    icon: '/svg/certificate.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.CERTIFICATE}`,
    table: {
      table: table.certificateTable
    },
    createForm: {
      inputs: form.certificatesForm.inputsAdd,
      initialValues: form.certificatesForm.initialValues,
      action: createContactAction,
      schema: schema.certificate.certificateAdd,
      title: 'Create Certificate',
      uploadConfig: UPLOADSERVICE.CERTIFICATE,
      link: `${adminVariables.pathAdminPage}/${Resource.CERTIFICATE}/${Action.CREATE}`,
    },
    editFrom: {
      inputs: form.certificatesForm.inputsEdit,
      initialValues: form.certificatesForm.initialValues,
      action: updateContactAction,
      schema: schema.certificate.certificateEdit,
      title: 'Edit Certificate',
    },
    editFormImage: {
      inputs: form.certificatesForm.inputsEditImage,
      initialValues: form.certificatesForm.initialValues,
      action: updateContactImageAction,
      schema: schema.certificate.certificateEditImage,
      title: 'Edit Certificate file',
    },
    validationSchema: schema.certificate,
    form: form.certificatesForm,
  },
  [Resource.CONTACT]: {
    id: 'admin-contacts',
    title: 'Contacts',
    icon: '/svg/contact.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.CONTACT}`,
    table: {
      table: table.contactTable
    },
    createForm: {
      inputs: form.contactsForm.inputsAdd,
      initialValues: form.contactsForm.initialValues,
      action: createContactAction,
      schema: schema.contact.contactAdd,
      title: 'Create contact',
      uploadConfig: UPLOADSERVICE.CONTACTS,
      link: `${adminVariables.pathAdminPage}/${Resource.CONTACT}/${Action.CREATE}`,
    },
    editFrom: {
      inputs: form.contactsForm.inputsEdit,
      initialValues: form.contactsForm.initialValues,
      action: updateContactAction,
      schema: schema.contact.contactEdit,
      title: 'Edit contact',
    },
    editFormImage: {
      inputs: form.contactsForm.inputsEditImage,
      initialValues: form.contactsForm.initialValues,
      action: updateContactImageAction,
      schema: schema.contact.contactEditImage,
      title: 'Edit contact image',
    },
    validationSchema: schema.contact,
    form: form.contactsForm,
  },
  [Resource.TECHSTACK]: {
    id: 'admin-techstack',
    title: 'Tech Stack',
    icon: '/svg/tech.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.TECHSTACK}`,
    editForm: null,
    createForm: {
      inputs: null,
      initialValues: null,
      action: null,
      schema: null,
      title: 'Create techstack',
    },
    validationSchema: null,
    form: null,
    actionCreate: null
  },
  [Resource.USER]: {
    id: 'admin-users',
    title: 'Users',
    icon: '/svg/user.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.USER}`,
    editForm: null,
    createForm: null,
    validationSchema: null,
    form: null,
    actionCreate: null,
  },
  [Resource.PROFILE]: {
    id: 'admin-profile',
    title: 'Profile',
    icon: '/svg/profile.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.PROFILE}`,
    editForm: form.profileForm,
    createForm: null,
    validationSchema: schema.profile,
    form: form.profileForm,
    actionCreate: null
  },
};


export { resourceConfig, adminVariables }

