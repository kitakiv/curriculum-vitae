import { ProjectCard } from "@/types/index";

const projects = {
    id: "projects",
    heading: "Featured Projects",
    text: "A collection of my recent work showcasing creativity, technical skills, and passion for beautiful user experiences. Each project represents a unique challenge and innovative solution.",
    githubButton: "View on GitHub",
    githubSvg: "/svg/github.svg",
    demoButton: "View Deploy",
    defaultImage: "/svg/image-broken.svg",
    name: "projects"
}

const demoProject: ProjectCard = {
    title: "Demo Project",
    description: "This is a demo project with tailwindcss and nextjs framework with typescript".repeat(8),
    image: "/image/projects/project.png",
    demoLink: "https://tailwindcss.com/docs/grid-template-rows",
    githubLink: "https://github.com/tailwindlabs/tailwindcss",
}

const anoutherDemoProject: ProjectCard = {
    title: "Demo Project",
    description: "This is a demo project",
    image: "/image/developer1.jpg",
    demoLink: "https://tailwindcss.com/docs/grid-template-rows",
    githubLink: "https://github.com/tailwindlabs/tailwindcss",
}

const projectImages = ["/image/developer4.png", "image/developer5.png", "/image/developer3.jpg"];
const projectDescription = [{ title: "Frontend", text: "I like to code things from scratch, and enjoy bringing ideas to life in the browser." },
    { title: "Backend", text: "I have experience developing fast and optimised back-end systems and APIs." },
    { title: "Fullstack", text: "I like to code things from scratch, and enjoy bringing ideas to life in the browser." }]
    
export default projects;
export {demoProject, anoutherDemoProject, projectImages, projectDescription}