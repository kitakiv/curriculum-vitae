
import * as Yup from "yup";


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
.matches(/^\+380\d{9}$/, "Invalid phone number format");

const location = Yup.string().required("Location is required");

const sliderName = Yup.string().required("Slider name is required")
.min(3, "Slider name must be at least 3 characters long")
.max(60, "Slider name must be at most 60 characters long")

const sliderText = Yup.string().required("Slider text is required")
.min(10, "Slider text must be at least 10 characters long")
.max(100, "Slider text must be at most 100 characters long")
const sliderImage = Yup.mixed().required("Slider image is required")
.test("fileSize", `File size must be less than 1MB`,
    (value) => value && (value as File).size <= 1024 * 1024 * 100)
.test("fileType", "Invalid file type",
    (value) => value && ["image/jpeg", "image/png", "image/webp"].includes((value as File).type));
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
    slider: Yup.object().shape({
        sliderName,
        sliderText,
        sliderImage
    })
}
export default schema