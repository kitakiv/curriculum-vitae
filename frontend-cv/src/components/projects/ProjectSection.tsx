import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import projects from "@/variables/projects/projects"
import CardProject from "@/components/projects/components/CardProject"
import { ProjectCard } from "@/types/index"
import FadeInSection from "@/components/animation/FadeInSection"

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
        <section className="flex flex-col items-center justify-center padding gap-4" id={projects.id}>
            <FadeInSection>
            <TextHeading>{projects.heading}</TextHeading>
            </FadeInSection>
            <FadeInSection>
            <TextGray tailwind="text-center">{projects.text}</TextGray>
            </FadeInSection>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 w-full">
                {projectsArray.map((project, index) => (
                    <FadeInSection key={`project-${index}`} >
                        <CardProject  project={project} />
                    </FadeInSection>
                ))}
            </div>
        </section>
    )
}