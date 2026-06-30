import { Profile } from "@/gql/graphql";


const header = {
    name: "Victoria",
    surname: "Surename",
    id: "header",
    button: "Learn About Me",
    firstTitle: "fullstack",
    secondTitle: "developer",
    keyIcons: "key-icons",
    path: "/image/developer.jpg",
    text: "Hi, I'm Victoria — a developer, dancer, and dream chaser. Creating digital",
    arrow: "/svg/arrow.svg",
    location: "Kyiv, Ukraine",
    email: "kit@gmail.com",
    phone: "+380931234567",
    defaultImageChange: 7000,
    buttonSignUp: {
        text: "Sign up",
        link: "/signup"
    },
    buttonLogin: {
        text: "Log in",
        link: "/login"
    },
    buttonAdmin: {
        text: "Admin",
        link: "/admin/dashboard"
    },
    profileButton: {
        svgLink: "/svg/profile.svg"
    }
}

const deafultProfile: Profile = {
    id: "header",
    name: "Victoria",
    surname: "Nykytenko",
    email: "kitakiv@gmail.com",
    phone: "+380931234567",
    location: "Kyiv, Ukraine",
    typingText: "Hi, I'm Victoria — a developer, dancer, and dream chaser. Creating digital",
    profilePhotos: ["/image/developer.jpg", "/image/developer3.jpg", "/image/developer2.jpg"],
}
export { deafultProfile };
export default header;