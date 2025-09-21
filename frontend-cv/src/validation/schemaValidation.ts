
import * as Yup from "yup";
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };


const login = Yup.string().required("Login is required")
    .min(3, "Login must be at least 3 characters long")
    .max(20, "Login must be at most 20 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Login can only contain letters and numbers");
const password = Yup.string().required("Password is required")
.min(8, "Password must be at least 8 characters long")
.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
.matches(/[a-z]/, "Password must contain at least one lowercase letter")
.matches(/[0-9]/, "Password must contain at least one number")
.matches(/[@$!%*?&#]/, "Password must contain at least one special character");

const name = Yup.string().required("Name is required")
.min(3, "Name must be at least 3 characters long")
.max(20, "Name must be at most 20 characters long")
.matches(/^[a-zA-Z]+$/, "Name can only contain letters");

const surname = Yup.string().required("Surname is required")
.min(3, "Surname must be at least 3 characters long")
.max(32, "Surname must be at most 32 characters long")
.matches(/^[a-zA-Z]+$/, "Surname can only contain letters");

const typingText = Yup.string().required("Typing Text is required")
.min(10, "Typing Text must be at least 10 characters long")
.max(100, "Typing Text must be at most 100 characters long");

const email = Yup.string().required("Email is required")
.email("Invalid email format");

const phone = Yup.string().required("Phone number is required")
.matches(/^\+380\d{9}$/, "Invalid phone number format must be +380XXXXXXXXX");

const location = Yup.string().required("Location is required");

const sliderName = Yup.string().required("Slider name is required")
.min(3, "Slider name must be at least 3 characters long")
.max(60, "Slider name must be at most 60 characters long")

const sliderText = Yup.string().required("Slider text is required")
.min(10, "Slider text must be at least 10 characters long")
.max(100, "Slider text must be at most 100 characters long")


const projectTitle = Yup.string().required("Project title is required")
.min(3, "Project title must be at least 3 characters long")
.max(60, "Project title must be at most 60 characters long")

const projectDescription = Yup.string().required("Project description is required")
.min(10, "Project description must be at least 10 characters long")
.max(1000, "Project description must be at most 1000 characters long");



// function isValidFileType(fileName: string, fileTypeKey: string) {
//   const fileType= fileName.split('.'). pop() || '';
//  return validFileExtensions[fileTypeKey as keyof typeof validFileExtensions].includes(fileType);
// }

const image = Yup.mixed().required("Contact image is required")
.test("fileSize", `File size must be less than 1MB`,
    (value) => value && (value as File).size <= 1024 * 1024 * 1)
.test("fileType", "Invalid file type",
    (value) => value && ["image/jpeg", "image/png", "image/webp"].includes((value as File).type));


const projectGithubLink = Yup.string().required("Github link is required")
.url("Invalid Github link format")
.matches(/^(https?:\/\/)/, "Invalid Demo link format");

const projectDemoLink = Yup.string().required("Demo link is required")
.url("Invalid Demo link format")
.matches(/^(https?:\/\/)/, "Invalid Demo link format");

const contactName = Yup.string().required("Contact name is required")
.min(3, "Contact name must be at least 3 characters long")
.max(20, "Contact name must be at most 20 characters long");

// const contactSvg = Yup.mixed().required("Contact image is required")
// .test("fileSize", `File size must be less than 1MB`,
//     (value) => value && (value as File).size <= 1024 * 1024 * 100)
// .test("fileType", "Invalid file type",
//     (value) => value && ["image/jpeg", "image/png", "image/webp"].includes((value as File).type));

const contactLink = Yup.string().required("Contact link is required")
.url("Invalid contact link format")
.matches(/^(https?:\/\/)/, "Invalid contact link format");

const schema = {
    custom : Yup.object().shape({
        login,
        password,
    }),
    profile: Yup.object().shape({
        name,
        surname,
        typingText,
        email,
        phone,
        location
    }),
    mainImage: Yup.object().shape({
        mainImage: image
    }),
    slider: {
        sliderEdit: Yup.object().shape({
            sliderName,
            sliderText,
        }),
        sliderAdd: Yup.object().shape({
            sliderName,
            sliderText,
            sliderImage: image
        }),
        sliderImage: Yup.object().shape({
            sliderImage: image
        }),
    },
    project: {
        projectEdit: Yup.object().shape({
            projectTitle,
            projectDescription,
            projectGithubLink,
            projectDemoLink
        }),
        projectAdd: Yup.object().shape({
            projectTitle,
            projectDescription,
            projectImage: image,
            projectGithubLink,
            projectDemoLink
        }),
        projectEditImage: Yup.object().shape({
            projectImage: image
        }),
    },
    contact: {
        contactEdit: Yup.object().shape({
            contactName,
            contactLink,
        }),
        contactAdd: Yup.object().shape({
            contactName,
            contactLink,
            contactSvg: image
        }),
        contactEditImage: Yup.object().shape({
            contactSvg: image
        }),
    }
}
export default schema