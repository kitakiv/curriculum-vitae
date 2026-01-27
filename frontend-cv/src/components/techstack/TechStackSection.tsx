import techStack, { techStacks } from "@/variables/techstack/techstack"
import FadeInSection from "../animation/FadeInSection"
import TextHeading from "../text/TextHeading"
import TextGray from "../text/TextGray"
import SkillButton from "../button/SkillButton"
import { buttons } from "@/variables/techstack/techstack"
import TechStackIcon from "./components/TechStackIcon"
import IconSection from "./components/IconSection"

export default function TechStackSection() {
    return  <section className="flex flex-col overflow-hidden items-center justify-center padding gap-4" id={techStack.id}>
    <FadeInSection>
    <TextHeading>{techStack.heading}</TextHeading>
    </FadeInSection>
    <FadeInSection tailwind="w-full text-center">
    <TextGray tailwind="text-center w-full text-wrap">{techStack.text}</TextGray>
    </FadeInSection>
    <div className="flex flex-wrap items-center justify-center gap-4">{
        buttons.map((button) => (
                <SkillButton active={button === 'All'}  key={`techStack-${button}-button`}>{button}</SkillButton>
            ))
        }
    </div>
    <IconSection />
</section>
}