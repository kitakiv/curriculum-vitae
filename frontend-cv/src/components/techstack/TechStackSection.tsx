import techStack from "@/variables/techstack/techstack"
import FadeInSection from "../animation/FadeInSection"
import TextHeading from "../text/TextHeading"
import TextGray from "../text/TextGray"
import SkillButton from "../button/SkillButton"
import { buttons } from "@/variables/techstack/techstack"

export default function TechStackSection() {
    return  <section className="flex flex-col items-center justify-center padding gap-4" id={techStack.id}>
    <FadeInSection>
    <TextHeading>{techStack.heading}</TextHeading>
    </FadeInSection>
    <FadeInSection>
    <TextGray tailwind="text-center">{techStack.text}</TextGray>
    </FadeInSection>
    <div className="w-full flex flex-wrap items-center justify-center gap-4">{
        buttons.map((button) => (
                <SkillButton active={button === 'All'}  key={`techStack-${button}-button`}>{button}</SkillButton>
            ))
        }
    </div>
</section>
}