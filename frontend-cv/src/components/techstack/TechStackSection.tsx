import techStack, { techStacks } from "@/variables/techstack/techstack"
import FadeInSection from "../animation/FadeInSection"
import TextHeading from "../text/TextHeading"
import TextGray from "../text/TextGray"
import SkillButton from "../button/SkillButton"
import { buttons } from "@/variables/techstack/techstack"
import TechStackIcon from "./components/TechStackIcon"
import IconSection from "./components/IconSection"
import TextPortfolio from "../text/TextPortfolio"

export default function TechStackSection() {
    return  <section className="flex flex-col overflow-hidden items-center justify-center padding gap-4" id={techStack.id}>
    <FadeInSection>
    <TextPortfolio tailwind="text-center">{techStack.portfolio}</TextPortfolio>
    <TextHeading>{techStack.heading}</TextHeading>
    </FadeInSection>
    <FadeInSection tailwind="w-full text-center">
    <TextGray tailwind="text-center w-full text-wrap">{techStack.text}</TextGray>
    </FadeInSection>
    <div className="flex gap-4 items-center justify-center flex-wrap">{
        buttons.map((button) => (
                <SkillButton active={button === 'All'}  key={`techStack-${button}-button`}>{button}</SkillButton>
            ))
        }
    </div>
    <IconSection />
    <SkillButton active={true} key={`techStack-showed-buttons`}>
                <div className="flex gap-2 items-center justify-center" >
                <img className="w-6 h-6"  src={techStack.doneSvg} alt="lighting" />
                {`Showing ${techStacks.length} of ${techStacks.length} tech stacks`}
                </div>
    </SkillButton>
</section>
}