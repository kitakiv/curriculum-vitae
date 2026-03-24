import form from "../form/form";
import schema from "@/validation/schemaValidation";
import { createContactAction, updateContactAction, updateContactImageAction } from "@/app/actions/contacts";
import { createCertificateAction, updateCertificateAction, updateCertificateImageAction, deleteCertificateAction } from "@/app/actions/certificate";
import { UPLOADSERVICE } from "@/variables/upload/upload";
import { createSliderAction, deleteSliderAction, updateSliderAction, updateSliderImageAction } from "@/app/actions/sliders";
import table from "../table/table";
import { updateProfileAction, updateProfileImageAction, updateProfileImagesAction } from "@/app/actions/profile";
import { deleteContactAction } from "@/app/actions/contacts";

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
  dashBoard: 'Dashboard',
  pathAdminPage: '/admin/dashboard',
  edit: {
    button: 'Edit',
    title: 'Edit',
    path: 'update'

  },
  delete: {
    button: 'Delete',
    title: 'Delete',
    path: 'delete'
  },
  view: {
    button: 'View',
    title: 'View',
    path: 'view'
  }
  ,
  create: {
    button: 'Create',
    title: 'Create',
    path: 'create',
  }
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
    deleteForm: {
      title: 'Delete slider',
      action: deleteSliderAction,
      schema: schema.slider.sliderDelete,
      inputs: form.sliderForm.inputsDelete,
      initialValues: form.sliderForm.initialValuesDelete
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
      action: createCertificateAction,
      schema: schema.certificate.certificateAdd,
      title: 'Create Certificate',
      uploadConfig: UPLOADSERVICE.CERTIFICATE,
      link: `${adminVariables.pathAdminPage}/${Resource.CERTIFICATE}/${Action.CREATE}`,
    },
    editFrom: {
      inputs: form.certificatesForm.inputsEdit,
      initialValues: form.certificatesForm.initialValues,
      action: updateCertificateAction,
      schema: schema.certificate.certificateEdit,
      title: 'Edit Certificate',
    },
    editFormImage: {
      inputs: form.certificatesForm.inputsEditImage,
      initialValues: form.certificatesForm.initialValues,
      action: updateCertificateImageAction,
      schema: schema.certificate.certificateEditImage,
      title: 'Edit Certificate file',
    },
    deleteForm: {
      inputs: form.certificatesForm.inputsDelete,
      initialValues: form.certificatesForm.initialValuesDelete,
      action: deleteCertificateAction,
      schema: schema.certificate.certificateDelete,
      title: 'Delete Certificate',
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
    deleteForm: {
      inputs: form.contactsForm.inputsDelete,
      initialValues: form.contactsForm.initialValuesDelete,
      action: deleteContactAction,
      schema: schema.contact.contactDelete,
      title: 'Delete contact',
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
    table: {
      table: table.profileTable
    },
    createForm: null,
    editFrom: {
      inputs: form.profileForm.inputsEdit,
      initialValues: form.profileForm.initialValues,
      action: updateProfileAction,
      schema: schema.profile.profileEdit,
      title: 'Edit Profile',
    },
    editFormImage: {
      inputs: form.profileForm.inputsEditImage,
      initialValues: form.profileForm.initialValuesImage,
      action: updateProfileImageAction,
      schema: schema.profile.profileEditImage,
      title: 'Change the Profile photo',
      uploadConfig: UPLOADSERVICE.PROFILE
    },
    editFormImages: {
      inputs: form.profileForm.inputsEditImages,
      initialValues: form.profileForm.initialValues,
      action: updateProfileImagesAction,
      schema: schema.profile.profileEditImages,
      title: 'Upload new Profile photos',
      uploadConfig: UPLOADSERVICE.PROFILE
    },
    validationSchema: schema.slider,
    form: form.sliderForm,
  },
};


export { resourceConfig, adminVariables }

