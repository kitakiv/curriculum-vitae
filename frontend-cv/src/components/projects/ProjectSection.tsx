import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import projects from "@/variables/projects/projects"
import CardProject from "./components/CardProject"
import { ProjectCard } from "@/types/index"

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

export default function ProjectSection() {
    const projectsArray: ProjectCard[] = [...Array(6)].map((_, index) => (index % 2 === 0) ? demoProject : anoutherDemoProject);
    return (
        <section className="flex flex-col items-center justify-center lg:py-16 md:py-14 sm:py-12 py-10 lg:px-6 md:px-6 sm:px-4 px-2 gap-4" id={projects.id}>
            <TextHeading>{projects.heading}</TextHeading>
            <TextGray>{projects.text}</TextGray>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 w-full">
                {projectsArray.map((project, index) => (
                    <CardProject key={`project-${index}`} project={project} />
                ))}
            </div>
        </section>
    )
}