import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import projects from "@/variables/projects/projects"
import FadeInSection from "@/components/animation/FadeInSection"
import SkillButton from "../button/SkillButton"
import techStack, { techStacks } from "@/variables/techstack/techstack"
import TextPortfolio from "../text/TextPortfolio"
import ProjectComponent from "./components/ProjectsComponent"

export default function ProjectSection() {
    return (
        <section className="flex flex-col relative z-10 items-center justify-center padding gap-4" id={projects.id}>
            <FadeInSection>
               <TextPortfolio tailwind="text-center">{projects.portfolio}</TextPortfolio>
                <TextHeading>{projects.heading}</TextHeading>
            </FadeInSection>
            <FadeInSection>
                <TextGray tailwind="text-center">{projects.text}</TextGray>
            </FadeInSection>
            <div className="flex flex-wrap items-center justify-center gap-4">{
                techStacks.map((tech) => (
                    <SkillButton active={tech.techName === 'All'} key={`techStack-${tech.techName}-button`}>{tech.techName}</SkillButton>
                ))
            }
            </div>
            <ProjectComponent columns={2} techId={techStack.all} />
        </section>
    )
}