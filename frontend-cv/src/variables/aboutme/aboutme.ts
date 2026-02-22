import { Slider } from "@/gql/graphql";

const aboutme = {
    name: "about me",
    id: "about_me",
    heading: "About Me",
    text: "Get to know the person behind the code. Here's my journey, passions, and what drives me every day.",
    portfolio: "Me as a DEVELOPER"
}

const defaultSliders: Slider[] = [
    {
        id: "1",
        sliderImage: "/image/developer1.jpg",
        sliderName: "Frontend Developer",
        sliderText: "I like to code things from scratch, and enjoy bringing ideas to life in the browser."
    },
    {
        id: "2",
        sliderImage: "/image/developer2.jpg",
        sliderName: "Backend Developer",
        sliderText: "I have experience developing fast and optimised back-end systems and APIs."
    },
    {
        id: "3",
        sliderImage: "/image/developer3.jpg",
        sliderName: "Fullstack Developer",
        sliderText: "I like to code things from scratch, and enjoy bringing ideas to life in the browser."
    }
];




export default aboutme;
export { defaultSliders };