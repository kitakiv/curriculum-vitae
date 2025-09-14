


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
        id: "/admin/login",
    },
    profileForm: {
        type: "oneElement",
        initialValues: { name: "", surname: "", typingText: "", email: "", phone: "", location: "" },
        inputs: [
            { id: "name", label: "Name", name: "name", placeholder: "Name", type: "text" },
            { id: "surname", label: "Surname", name: "surname", placeholder: "Surname", type: "text" },
            { id: "typingText", label: "Typing Text", name: "typingText", placeholder: "Typing Text", type: "text" },
            { id: "email", label: "Email", name: "email", placeholder: "Email", type: "email" },
            { id: "phone", label: "Phone", name: "phone", placeholder: "Phone", type: "tel" },
            { id: "location", label: "Location", name: "location", placeholder: "Location", type: "text" },
        ],
        title: "Profile Information",
        name: "Profile",
        id: "profile-admin",
    },
    sliderForm: {
        type: "add",
        initialValues: { sliderName: "", sliderText: "", sliderImage: "" },
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
        title: "Slider Information",
        name: "Slider",
        id: "slider-admin",
    },
    projectForm: {
        initialValues: { projectTitle: "", projectDescription: "", projectImage: "", projectGithubLink: "", projectDemoLink: "" },
        inputsAdd: [
            { id: "projectTitle", label: "Title", name: "projectTitle", placeholder: "Title", type: "text" },
            { id: "projectDescription", label: "Description", name: "projectDescription", placeholder: "Description", type: "text", as: "textarea" },
            { id: "projectImage", label: "Image", name: "projectImage", placeholder: "Image", type: "file" },
            { id: "projectGithubLink", label: "Github Link", name: "projectGithubLink", placeholder: "Github Link", type: "text" },
            { id: "projectDemoLink", label: "Demo Link", name: "projectDemoLink", placeholder: "Demo Link", type: "text" },
        ],
        inputsEdit: [
            { id: "projectTitle", label: "Title", name: "projectTitle", placeholder: "Title", type: "text" },
            { id: "projectDescription", label: "Description", name: "projectDescription", placeholder: "Description", type: "text", as: "textarea" },
            { id: "projectGithubLink", label: "Github Link", name: "projectGithubLink", placeholder: "Github Link", type: "text" },
            { id: "projectDemoLink", label: "Demo Link", name: "projectDemoLink", placeholder: "Demo Link", type: "text" },
        ],
        inputsEditImage: [
            { id: "projectImage", label: "Image", name: "projectImage", placeholder: "Image", type: "file" },
        ],
        title: "Project Information",
        name: "Project",
        id: "project-admin",
    },
    contactsForm: {
        initialValues: { contactName: "", contactSvg: "", contactLink: "" },
        inputsAdd: [
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
        title: "Contact Information",
        name: "Contacts",
        id: "contact-admin",
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
    }
}
export default form;