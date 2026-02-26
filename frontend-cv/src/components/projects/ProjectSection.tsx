import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import projects from "@/variables/projects/projects"
import FadeInSection from "@/components/animation/FadeInSection"
import TextPortfolio from "../text/TextPortfolio"
import ProjectComponent from "./components/ProjectsComponent"
import { getTechStacksCached } from "@/query/techStack.query"
import { GetTechStacksQuery } from "@/gql/graphql"
import techStackVariable from "@/variables/techstack/techstack"
import TechButtons from "./components/TechButtons"

export default async function ProjectSection({ selectedTechId }: { selectedTechId?: string }) {
    const techStacks: GetTechStacksQuery["techstacks"] = await getTechStacksCached();
    return (
        <section className="flex flex-col relative z-10 items-center justify-center padding gap-4" id={projects.id}>
            <FadeInSection>
               <TextPortfolio tailwind="text-center">{projects.portfolio}</TextPortfolio>
                <TextHeading>{projects.heading}</TextHeading>
            </FadeInSection>
            <FadeInSection>
                <TextGray tailwind="text-center">{projects.text}</TextGray>
            </FadeInSection>
            <TechButtons techs={techStacks}/>
            <ProjectComponent columns={2} techId={selectedTechId} />
        </section>
    )
}