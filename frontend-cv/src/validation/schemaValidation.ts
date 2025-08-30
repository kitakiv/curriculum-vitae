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

const schema = {
    custom : Yup.object().shape({
        login,
        password,
    }),
}
export default schema