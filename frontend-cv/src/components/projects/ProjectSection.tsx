import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import projects from "@/variables/projects/projects"
import CardProject from "./components/CardProject"

export default function ProjectSection() {
    return (
        <section className="flex flex-col items-center justify-center lg:py-16 md:py-14 sm:py-12 py-10 lg:px-6 md:px-6 sm:px-4 px-2 gap-4" id={projects.id}>
            <TextHeading>{projects.heading}</TextHeading>
            <TextGray>{projects.text}</TextGray>
            <CardProject />
        </section>
    )
}