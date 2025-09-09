

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
    },
    sliderForm: {
        initialValues: { sliderName: "", sliderText: "", sliderImage: "" },
        inputs: [
            { id: "sliderName", label: "Slider Name", name: "sliderName", placeholder: "Slider Name", type: "text" },
            { id: "sliderText", label: "Slider Text", name: "sliderText", placeholder: "Slider Text", type: "text", as: "textarea" },
            { id: "sliderImage", label: "Slider Image", name: "sliderImage", placeholder: "Slider Image", type: "file" },
        ],
        title: "Slider Information",
    },
    moreInfoContent: {
        buttonMore: "/svg/arrow.svg",
        buttonEdit: "Edit",
        buttonCancel: "Cancel",
        buttonSave: "Save",
        buttonAdd: "Add",
    }
}
export default form;