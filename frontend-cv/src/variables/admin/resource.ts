import form from "../form/form";
import schema from "@/validation/schemaValidation";
import { createContactAction, updateContactAction, updateContactImageAction } from "@/app/actions/contacts";
import { createCertificateAction, updateCertificateAction, updateCertificateImageAction, deleteCertificateAction } from "@/app/actions/certificate";
import { UPLOADSERVICE } from "@/variables/upload/upload";
import { createSliderAction, deleteSliderAction, updateSliderAction, updateSliderImageAction } from "@/app/actions/sliders";
import table from "../table/table";
import { addProfileImageAction, deleteProfileImageAction, updateProfileAction, updateProfileImageAction, updateProfileImagesAction } from "@/app/actions/profile";
import { deleteContactAction } from "@/app/actions/contacts";
import { addProjectImageAction, createProjectAction, deleteProjectAction, deleteProjectImageAction, updateProjectAction, updateProjectImageAction, updateProjectImagesAction } from "@/app/actions/project";
import { createTechStackAciton, deleteTechStackAciton, updateTechStackAction, updateTechStackImageAction } from "@/app/actions/techstack";
import { createTechCategoryAction, deleteTechCategoryAction, updateTechCategoryAction } from "@/app/actions/category";
import { attachRoleToUserAction, deleteUserAction } from "@/app/actions/auth";
import { createRoleAction, deleteRoleAction, updateRoleAction } from "@/app/actions/role";

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
  },
  attachRole: {
    button: 'Attach Role',
    title: 'Attach Role to user',
    path: 'update'
  }
}

const resourceConfig = {
  [Resource.PROJECT]: {
    id: 'admin-project',
    title: 'Projects',
    icon: '/svg/project.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.PROJECT}`,
    table: {
      table: table.projectsTable
    },
    createForm: {
      inputs: form.projectForm.inputsAdd,
      initialValues: form.projectForm.initialValues,
      action: createProjectAction,
      schema: schema.project.projectAdd,
      title: 'Create project',
      uploadConfig: UPLOADSERVICE.PROJECTS
    },
    editForm: {
      inputs: form.projectForm.inputsEdit,
      initialValues: form.projectForm.initialValues,
      action: updateProjectAction,
      schema: schema.project.projectEdit,
      title: 'Edit project',
    },
    editFormImage: {
      inputs: form.projectForm.inputsEditImage,
      initialValues: form.projectForm.initialValues,
      action: updateProjectImageAction,
      schema: schema.project.projectEditImage,
      title: 'Edit project photo',
      uploadConfig: UPLOADSERVICE.PROJECTS
    },
    addFormImage: {
      inputs: form.projectForm.inputsEditImage,
      initialValues: form.projectForm.initialValues,
      action: addProjectImageAction,
      schema: schema.project.projectEditImage,
      title: 'Add Project Image',
      uploadConfig: UPLOADSERVICE.PROJECTS
    },
    deleteFormImage: {
      uploadConfig: UPLOADSERVICE.PROJECTS,
      action: deleteProjectImageAction,
    },
    editFormImages: {
      inputs: form.projectForm.inputsEditImages,
      initialValues: form.projectForm.initialValues,
      action: updateProjectImagesAction,
      schema: schema.project.projectEditImages,
      title: 'Edit project images',
      uploadConfig: UPLOADSERVICE.PROJECTS
    },
    deleteForm: {
      title: 'Delete project',
      action: deleteProjectAction,
      schema: schema.project.projectDelete,
      inputs: form.projectForm.inputsDelete,
      initialValues: form.projectForm.initialValuesDelete
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
    table: {
        table: table.techStackTable
    },
    createForm: {
      inputs: form.techStackForm.inputsAdd,
      initialValues: form.techStackForm.initialValues,
      action: createTechStackAciton,
      schema: schema.techStack.techStackAdd,
      title: 'Create tech stack',
      uploadConfig: UPLOADSERVICE.TECHSTACK,
      link: `${adminVariables.pathAdminPage}/${Resource.TECHSTACK}/${Action.CREATE}`,
    },
    editForm: {
      inputs: form.techStackForm.inputsEdit,
      initialValues: form.techStackForm.initialValues,
      action: updateTechStackAction,
      schema: schema.techStack.techStackEdit,
      title: 'Edit tech stack',
    },
    editFormImage: {
      inputs: form.techStackForm.inputsEditImage,
      initialValues: form.techStackForm.initialValues,
      action: updateTechStackImageAction,
      schema: schema.techStack.techStackEditImage,
      title: 'Edit tech stack image',
      uploadConfig: UPLOADSERVICE.TECHSTACK
    },
    deleteForm: {
      inputs: form.techStackForm.inputsDelete,
      initialValues: form.techStackForm.initialValuesDelete,
      action: deleteTechStackAciton,
      schema: schema.techStack.techStackDelete,
      title: 'Delete tech stack',
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
    table: {
      table: table.userTable
    },
    attachRole: {
      inputs: form.userForm.inputs,
      initialValues: form.userForm.initialValues,
      action: attachRoleToUserAction,
      schema: schema.user.attachRole,
      title: 'Attach Role to user',
    },
    deleteForm: {
      inputs: form.userForm.inputsDelete,
      initialValues: form.userForm.initialValuesDelete,
      action: deleteUserAction,
      schema: schema.user.userDelete,
      title: 'Delete user',
    },
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
      title: 'Edit Profile Photo',
      uploadConfig: UPLOADSERVICE.PROFILE
    },
    addFormImage: {
      inputs: form.profileForm.inputsEditImage,
      initialValues: form.profileForm.initialValuesImage,
      action: addProfileImageAction,
      schema: schema.profile.profileEditImage,
      title: 'Add Profile Photo',
      uploadConfig: UPLOADSERVICE.PROFILE
    },
    deleteFormImage: {
      uploadConfig: UPLOADSERVICE.PROFILE,
      action: deleteProfileImageAction,
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
  [Resource.CATEGORY]: {
    id: 'admin-category',
    title: 'Tech Stack Categories',
    icon: '/svg/category.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.CATEGORY}`,
    table: {
      table: table.categoryTable
    },
    createForm : {
      inputs: form.categoryForm.inputs,
      initialValues: form.categoryForm.initialValues,
      action: createTechCategoryAction,
      schema: schema.category.category,
      title: 'Create Tech Stack Category',
      link: `${adminVariables.pathAdminPage}/${Resource.CATEGORY}/${Action.CREATE}`,
    },
    editForm: {
      inputs: form.categoryForm.inputs,
      initialValues: form.categoryForm.initialValues,
      action: updateTechCategoryAction,
      schema: schema.category.category,
      title: 'Edit Tech Stack Category',
    },
    deleteForm: {
      inputs: form.categoryForm.inputsDelete,
      initialValues: form.categoryForm.initialValuesDelete,
      action: deleteTechCategoryAction,
      schema: schema.category.categoryDelete,
      title: 'Delete Tech Stack Category',
    },
  },
  [Resource.ROLE]: {
    id: 'admin-roles',
    title: 'User Roles',
    icon: '/svg/role.svg',
    path: `${adminVariables.pathAdminPage}/${Resource.ROLE}`,
    table: {
      table: table.roleTable
    },
    deleteForm: {
      inputs: form.roleForm.inputsDelete,
      initialValues: form.roleForm.initialValuesDelete,
      action: deleteRoleAction,
      schema: schema.role.roleDelete,
      title: 'Delete User Role',
    },
    createForm: {
      inputs: form.roleForm.inputs,
      initialValues: form.roleForm.initialValues,
      action: createRoleAction,
      schema: schema.role.role,
      title: 'Create User Role',
      link: `${adminVariables.pathAdminPage}/${Resource.ROLE}/${Action.CREATE}`,
    },
    editForm: {
      inputs: form.roleForm.inputs,
      initialValues: form.roleForm.initialValues,
      action: updateRoleAction,
      schema: schema.role.role,
      title: 'Edit User Role',
    }
  }
};


export { resourceConfig, adminVariables }

