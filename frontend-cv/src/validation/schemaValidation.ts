
import techStack, { techStacks } from "@/variables/techstack/techstack";
import { attach } from "@react-three/fiber/dist/declarations/src/core/utils";
import { profile } from "console";
import { sign } from "crypto";
import * as Yup from "yup";
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1mb
const FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/avif",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
  "image/svg"
];

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



const images = Yup.array()
    .min(1, 'Upload at least one file')
    .max(10, 'Maximum 5 files allowed')
    .of(
      Yup.mixed()
        .test(
          'fileSize',
          'File too large (max 1MB)',
          (value) => value && (value as File).size <= MAX_FILE_SIZE
        )
        .test(
          'fileType',
          "Invalid file type use jpg, png, webp, svg, gif, avif, bmp, tiff, x-icon",
          (value) => value && FILE_TYPES.includes((value as File).type.toLowerCase())
        )
    )

const image = Yup.mixed().required("Contact image is required")
.test("fileSize", `File size must be less than 1MB`,
    (value) => value && (value as File).size <= MAX_FILE_SIZE)
.test("fileType", "Invalid file type use jpg, png, webp, svg, gif, avif, bmp, tiff, x-icon",
    (value) => value && FILE_TYPES.includes((value as File).type.toLowerCase()));

const deleteSchema = (expectedId: string) =>
  Yup.object({
    id: Yup.string()
      .required("ID is required")
      .oneOf([expectedId], `ID must be ${expectedId}`),
  });



const projectGithubLink = Yup.string().required("Github link is required")
.url("Invalid Github link format")
.matches(/^(https?:\/\/)/, "Invalid Demo link format");

const projectDemoLink = Yup.string().required("Demo link is required")
.url("Invalid Demo link format")
.matches(/^(https?:\/\/)/, "Invalid Demo link format");

const contactName = Yup.string().required("Contact name is required")
.min(3, "Contact name must be at least 3 characters long")
.max(20, "Contact name must be at most 20 characters long");

const certificateCompany = Yup.string().required("Certificate company is required")
.min(3, "Certificate company must be at least 3 characters long")
.max(50, "Certificate company must be at most 50 characters long");
const contactLink = Yup.string().required("Contact link is required")
.url("Invalid contact link format")
.matches(/^(https?:\/\/)/, "Invalid contact link format");

const certificateTitle = Yup.string().required("Certificate name is required")
.min(3, "Certificate name must be at least 3 characters long")
.max(50, "Certificate name must be at most 50 characters long");

const certificateDescription = Yup.string().required("Certificate description is required")
.min(10, "Certificate description must be at least 10 characters long")
.max(1000, "Certificate description must be at most 1000 characters long");

const certificateLink = Yup.string().optional().required("Certificate link is required")
.url("Invalid certificate link format")
.matches(/^(https?:\/\/)/, "Invalid certificate link format");

const certificatePeriodStart = Yup.date().required("Certificate period start date is required")
.max(new Date(), "Certificate period start date must be in the past")
.min(new Date('1900-01-01'), "Certificate period start date must be at least 1900-01-01");
const certificatePeriodEnd = Yup.date().required("Certificate period end date is required")
.min(new Date('1900-01-01'), "Certificate period end date must be in the future")
.max(new Date(Date.now()), "Certificate period end date must be in the past");

const techName = Yup.string().required("Tech stack name is required")
.min(3, "Tech stack name must be at least 3 characters long")
.max(50, "Tech stack name must be at most 50 characters long");

const uuid = Yup.string().required("ID is required")
.uuid("Invalid ID format");


const chekcbox  = Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one ') 
    .required('Required');

const attachRoleSchema = (expectedId: string) =>
  Yup.object({
    userId: Yup.string()
      .required("User ID is required")
      .oneOf([expectedId], `User ID must be ${expectedId}`),

    roleId: uuid,
  });


const schema = {
    custom : Yup.object().shape({
        login: email,
        password,
    }),
    signUp: Yup.object().shape({
        login: email,
        name,
        password
    }),
    profile: {
        profileEdit: Yup.object().shape({
            name,
            surname,
            typingText,
            email,
            phone,
            location
        }),
        profileEditImage: Yup.object().shape({
            profilePhoto: image
        }),
        profileEditImages: Yup.object().shape({
            profilePhotos: images
        })
    },
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
        sliderDelete: deleteSchema
    },
    project: {
        projectEdit: Yup.object().shape({
            projectTitle,
            projectDescription,
            projectGithubLink,
            projectDemoLink,
            techStacks: chekcbox,
        }),
        projectAdd: Yup.object().shape({
            projectTitle,
            projectDescription,
            projectGithubLink,
            projectDemoLink,
            techStacks: chekcbox,
            projectImages: images,
        }),
        projectEditImages: Yup.object().shape({
            projectImages: images
        }),
        projectEditImage: Yup.object().shape({
            projectImage: image
        }),
        projectDelete: deleteSchema
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
        contactDelete: deleteSchema
    },
    techStack: {
        techStackAdd: Yup.object().shape({
            techName: contactName,
            techSvg: image,
            projects: chekcbox,
            techCategories: chekcbox,
        }),
        techStackEdit: Yup.object().shape({
            techName: contactName,
            projects: chekcbox,
            techCategories: chekcbox,
        }),
        techStackEditImage: Yup.object().shape({
            techSvg: image
        }),
        techStackDelete: deleteSchema
    },
    certificate: {
        certificateEdit: Yup.object().shape({
            certificateTitle,
            certificateDescription,
            certificateLink,
            certificatePeriodStart,
            certificatePeriodEnd,
            certificateCompany,
        }),
        certificateAdd: Yup.object().shape({
            certificateTitle,
            certificateDescription,
            certificateLink,
            certificatePeriodStart,
            certificatePeriodEnd,
            certificateCompany,
            certificateImage: image
        }),
        certificateEditImage: Yup.object().shape({
            certificateImage: image
        }),
        certificateDelete: deleteSchema
    },
    category: {
        category: Yup.object().shape({
            categoryName: contactName,
            techStacks: chekcbox,
        }),
        categoryDelete: deleteSchema
    },
    user: {
        attachRole: attachRoleSchema,
        userDelete: deleteSchema
    },
    role: {
        roleDelete: deleteSchema
    }
}
export { deleteSchema };
export default schema