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

export default projects;
export {demoProject, anoutherDemoProject}