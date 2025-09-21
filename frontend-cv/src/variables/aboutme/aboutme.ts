import { SliderText } from "@/types/index";

const aboutme = {
    name: "about me",
    id: "about_me",
    heading: "About Me",
    text: "Get to know the person behind the code. Here's my journey, passions, and what drives me every day."
}

const imagesDefault = ["/image/developer1.jpg", "/image/developer2.jpg", "/image/developer3.jpg"];
const imagesTitle: SliderText[] = [{ title: "Frontend", text: "I like to code things from scratch, and enjoy bringing ideas to life in the browser." },
{ title: "Backend", text: "I have experience developing fast and optimised back-end systems and APIs." },
{ title: "Fullstack", text: "I like to code things from scratch, and enjoy bringing ideas to life in the browser." }]

export default aboutme;
export { imagesDefault, imagesTitle }