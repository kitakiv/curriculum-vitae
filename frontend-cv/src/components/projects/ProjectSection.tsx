import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import projects from "@/variables/projects/projects"
import CardProject from "@/components/projects/components/CardProject"
import { ProjectCard } from "@/types/index"
import FadeInSection from "@/components/animation/FadeInSection"
import { demoProject, anoutherDemoProject } from "@/variables/projects/projects"
import SkillButton from "../button/SkillButton"
import { buttons, techStacks } from "@/variables/techstack/techstack"
import TextPortfolio from "../text/TextPortfolio"
import flyModel from "@/variables/3d/flymodel";

export default function ProjectSection() {
    const projectsArray: ProjectCard[] = [...Array(6)].map((_, index) => (index % 2 === 0) ? demoProject : anoutherDemoProject);
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
            <div id={flyModel.stopId} className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 w-full">
                {projectsArray.map((project, index) => (
                    <FadeInSection key={`project-${index}`} >
                        <CardProject project={project} />
                    </FadeInSection>
                ))}
            </div>
            <SkillButton active={true} key={`techStack-${buttons[0]}-button`}>
                <div className="flex gap-2 items-center justify-center" >
                <img className="w-6 h-6"  src={projects.lightSvg} alt="lighting" />
                {`Showing ${projectsArray.length} of ${projectsArray.length} projects`}
                </div>
            </SkillButton>
        </section>
    )
}