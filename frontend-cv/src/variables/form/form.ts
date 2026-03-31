import { init } from "@graphql-codegen/cli";
import techStack from "../techstack/techstack";




const form = {
    loginForm: {
        initialValues: { login: "", password: "" },
        inputs: [
            { id: "login", label: "Login", name: "login", placeholder: "Login", type: "text" },
            { id: "password", label: "Password", name: "password", placeholder: "Password", type: "password" },
        ],
        buttonText: "Login",
        svg: "/svg/login.svg",
        title: "Welcome back!",
        text: "Sign in to your account to continue",
        name: "login as admin",
        id: "/login",
        metadataTitle: "Login Page",
        metadataDesctiption: "Login Form",
        loginFormLoading: "Loading..."
    },
    signupForm: {
        initialValues: { login: "", name: "", password: "" },
        inputs: [
            { id: "login", label: "Login", name: "login", placeholder: "Login", type: "text" },
            { id: "name", label: "Name", name: "name", placeholder: "Name", type: "text" },
            { id: "password", label: "Password", name: "password", placeholder: "Password", type: "password" },
        ],
        buttonText: "Sign Up",
        svg: "/svg/login.svg",
        title: "Create Account",
        text: "Sign up to get started",
        name: "signup as admin",
        id: "/signup",
        metadataTitle: "SingUp Page",
        metadataDesctiption: "SingUp Form",
        signUpFormLoading: "Creating Account..."
    },
    profileForm: {
        type: "oneElement",
        initialValuesImage: { profilePhoto: "" },
        initialValues: { name: "", surname: "", typingText: "", email: "", phone: "", location: "", profilePhotos: [] },
        inputsEdit: [
            { id: "name", label: "Name", name: "name", placeholder: "Name", type: "text" },
            { id: "surname", label: "Surname", name: "surname", placeholder: "Surname", type: "text" },
            { id: "typingText", label: "Typing Text", name: "typingText", placeholder: "Typing Text", type: "text" },
            { id: "email", label: "Email", name: "email", placeholder: "Email", type: "email" },
            { id: "phone", label: "Phone", name: "phone", placeholder: "Phone", type: "tel" },
            { id: "location", label: "Location", name: "location", placeholder: "Location", type: "text" },
        ],
        inputsEditImage: [
            { id: "profilePhoto", label: "Profile Photo", name: "profilePhoto", placeholder: "Profile Photo", type: "file"},
        ],
        inputsEditImages: [
            { id: "profilePhotos", label: "Profile Photos", name: "profilePhotos", placeholder: "Profile Photos", type: "files", multiple: true},
        ],
        inputsDelete: [
            { id: "id", label: "ID", name: "id", placeholder: "ID", type: "text" },
        ],
        title: "Profile settings",
        name: "Profile",
        id: "profile-admin",
    },
    sliderForm: {
        type: "add",
        initialValues: { sliderName: "", sliderText: "", sliderImage: "" },
        initialValuesDelete: { id: "" },
        inputsAdd: [
            { id: "sliderName", label: "Slider Name", name: "sliderName", placeholder: "Slider Name", type: "text" },
            { id: "sliderText", label: "Slider Text", name: "sliderText", placeholder: "Slider Text", type: "text", as: "textarea" },
            { id: "sliderImage", label: "Slider Image", name: "sliderImage", placeholder: "Slider Image", type: "file" },
        ],
        inputsEdit: [
            { id: "sliderName", label: "Slider Name", name: "sliderName", placeholder: "Slider Name", type: "text" },
            { id: "sliderText", label: "Slider Text", name: "sliderText", placeholder: "Slider Text", type: "text", as: "textarea" },
        ],
        inputsEditImage: [
            { id: "sliderImage", label: "Slider Image", name: "sliderImage", placeholder: "Slider Image", type: "file" },
        ],
        inputsDelete: [
            { id: "id", label: "ID", name: "id", placeholder: "ID", type: "text" },
        ],
        title: "Slider settings",
        name: "Slider",
        id: "slider-admin",
    },
    techStackForm: {
        initialValues: { techName: "", techSvg: "", projects: [], techCategories: [] },
        initialValuesDelete: { id: "" },
        inputsAdd: [
            { id: "techName", label: "Tech Stack Name", name: "techName", placeholder: "Tech Stack Name", type: "text" },
            { id: "techSvg", label: "Tech Stack Svg", name: "techSvg", placeholder: "Tech Stack Svg", type: "file" },
            { id: "projects", label: "Projects", name: "projects", placeholder: "Projects", type: "checkbox", options: [] },
            { id: "techCategories", label: "Tech Categories", name: "techCategories", placeholder: "Tech Categories", type: "checkbox", options: [] },
        ],
        inputsEdit: [
            { id: "techName", label: "Tech Stack Name", name: "techName", placeholder: "Tech Stack Name", type: "text" },
            { id: "projects", label: "Projects", name: "projects", placeholder: "Projects", type: "checkbox", options: [] },
            { id: "techCategories", label: "Tech Categories", name: "techCategories", placeholder: "Tech Categories", type: "checkbox", options: [] },
        ],
        inputsEditImage: [
            { id: "techSvg", label: "Tech Stack Svg", name: "techSvg", placeholder: "Tech Stack Svg", type: "file" },
        ],
        inputsDelete: [
            { id: "id", label: "ID", name: "id", placeholder: "ID", type: "text" },
        ],
        title: "Tech Stack settings",
        name: "Tech Stack",
        id: "techstack-admin",
    },
    projectForm: {
        initialValuesDelete: { id: "" },
        initialValues: { projectTitle: "", projectDescription: "", projectImages: [], projectGithubLink: "", projectDemoLink: "" , techStacks: [] },
        inputsAdd: [
            { id: "projectTitle", label: "Title", name: "projectTitle", placeholder: "Title", type: "text" },
            { id: "projectDescription", label: "Description", name: "projectDescription", placeholder: "Description", type: "text", as: "textarea" },
            { id: "projectGithubLink", label: "Github Link", name: "projectGithubLink", placeholder: "Github Link", type: "url" },
            { id: "projectDemoLink", label: "Demo Link", name: "projectDemoLink", placeholder: "Demo Link", type: "url" },
            { id: "techStacks", label: "Projects Tech Stacks", name: "techStacks", placeholder: "Tech Stack", type: "checkbox", options: [] },
            { id: "projectImages", label: "Project Images", name: "projectImages", placeholder: "Project Images", type: "files" },
            
        ],
        inputsEdit: [
            { id: "projectTitle", label: "Title", name: "projectTitle", placeholder: "Title", type: "text" },
            { id: "projectDescription", label: "Description", name: "projectDescription", placeholder: "Description", type: "text", as: "textarea" },
            { id: "projectGithubLink", label: "Github Link", name: "projectGithubLink", placeholder: "Github Link", type: "url" },
            { id: "projectDemoLink", label: "Demo Link", name: "projectDemoLink", placeholder: "Demo Link", type: "url" },
            { id: "techStacks", label: "Projects Tech Stacks", name: "techStacks", placeholder: "Tech Stack", type: "checkbox", options: [] },
        ],
        inputsEditImage: [
            { id: "projectImage", label: "Image", name: "projectImage", placeholder: "Image", type: "file" },
        ],
        inputsEditImages: [
            { id: "projectImages", label: "Project Images", name: "projectImages", placeholder: "Project Images", type: "files" },
        ],
        inputsDelete: [
            { id: "id", label: "ID", name: "id", placeholder: "ID", type: "text" },
        ],
        title: "Project settings",
        name: "Project",
        id: "project-admin",
    },
    contactsForm: {
        initialValuesDelete: { id: "" },
        initialValues: { contactName: "", contactSvg: "", contactLink: "" },
        inputsAdd:[
            { id: "contactName", label: "Contact Name", name: "contactName", placeholder: "Contact Name", type: "text" },
            { id: "contactSvg", label: "Contact Svg", name: "contactSvg", placeholder: "Contact Svg", type: "file" },
            { id: "contactLink", label: "Contact Link", name: "contactLink", placeholder: "Contact Link", type: "text" },
        ],
        inputsEdit: [
            { id: "contactName", label: "Contact Name", name: "contactName", placeholder: "Contact Name", type: "text" },
            { id: "contactLink", label: "Contact Link", name: "contactLink", placeholder: "Contact Link", type: "text" },
        ],
        inputsEditImage: [
            { id: "contactSvg", label: "Contact Svg", name: "contactSvg", placeholder: "Contact Svg", type: "file" },
        ],
        inputsDelete: [
            { id: "id", label: "ID", name: "id", placeholder: "ID", type: "text" },
        ],
        title: "Contact settings",
        name: "Contacts",
        id: "contact-admin",
    },
    certificatesForm: {
        initialValuesDelete: { id: "" },
        initialValues: { certificateTitle: "", certificateCompany: "", certificateDescription: "", certificateLink: "", certificateImage: "", certificatePeriodStart: new Date(), certificatePeriodEnd: new Date() },
        inputsAdd: [
            { id: "certificateTitle", label: "Certificate Title", name: "certificateTitle", placeholder: "Certificate Title", type: "text" },
            { id: "certificateCompany", label: "Certificate Company", name: "certificateCompany", placeholder: "Certificate Company", type: "text" },
            { id: "certificateDescription", label: "Certificate Description", name: "certificateDescription", placeholder: "Certificate Description", type: "text", as: "textarea" },
            { id: "certificateLink", label: "Certificate Link", name: "certificateLink", placeholder: "Certificate Link", type: "text" },
            { id: "certificateImage", label: "Certificate Image", name: "certificateImage", placeholder: "Certificate Image", type: "file" },
            { id: "certificatePeriodStart", label: "Certificate Period Start", name: "certificatePeriodStart", placeholder: "Certificate Period Start", type: "date" },
            { id: "certificatePeriodEnd", label: "Certificate Period End", name: "certificatePeriodEnd", placeholder: "Certificate Period End", type: "date" },
        ],
        inputsEdit: [
            { id: "certificateTitle", label: "Certificate Title", name: "certificateTitle", placeholder: "Certificate Title", type: "text" },
            { id: "certificateCompany", label: "Certificate Company", name: "certificateCompany", placeholder: "Certificate Company", type: "text" },
            { id: "certificateDescription", label: "Certificate Description", name: "certificateDescription", placeholder: "Certificate Description", type: "text", as: "textarea" },
            { id: "certificateLink", label: "Certificate Link", name: "certificateLink", placeholder: "Certificate Link", type: "text" },
            { id: "certificatePeriodStart", label: "Certificate Period Start", name: "certificatePeriodStart", placeholder: "Certificate Period Start", type: "date" },
            { id: "certificatePeriodEnd", label: "Certificate Period End", name: "certificatePeriodEnd", placeholder: "Certificate Period End", type: "date" },
        ],
        inputsEditImage: [
            { id: "certificateImage", label: "Certificate Image", name: "certificateImage", placeholder: "Certificate Image", type: "file" },
        ],
        inputsDelete: [
            { id: "id", label: "ID", name: "id", placeholder: "ID", type: "text" },
        ],
    },
    mainImageForm: {
        initialValues: { mainImage: "" },
        inputs: [
            { id: "mainImage", label: "Main Image", name: "mainImage", placeholder: "Main Image", type: "file" },
        ],
        title: "Main Image Information",
    },
    moreInfoContent: {
        buttonMore: "/svg/arrow.svg",
        buttonEdit: "Edit",
        buttonCancel: "Cancel",
        buttonSave: "Save",
        buttonAdd: "Add",
        buttonDelete: "Delete",
    },
    categoryForm: {
        initialValuesDelete: { id: "" },
        initialValues: { categoryName: "", techStacks: [] },
        inputs: [
            { id: "categoryName", label: "Category Name", name: "categoryName", placeholder: "Category Name", type: "text" },
            { id: "techStacks", label: "Tech Stacks", name: "techStacks", placeholder: "Tech Stacks", type: "checkbox", options: [] },
        ],
        inputsDelete: [
            { id: "id", label: "ID", name: "id", placeholder: "ID", type: "text" },
        ],
    }
}
export default form;