import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import aboutme from "@/variables/aboutme/aboutme"
import Slider from "@/components/aboutme/components/Slider"
import FadeInSection from "@/components/animation/FadeInSection"
export default function AboutMeSection() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 w-full padding" id={aboutme.id}>
            <FadeInSection>
                <TextHeading>
                    {aboutme.heading}
                </TextHeading>
            </FadeInSection>
            <FadeInSection>
                <TextGray tailwind="text-center">{aboutme.text}</TextGray>
            </FadeInSection>
            <FadeInSection tailwind="w-full flex items-center justify-center">
                <Slider />
            </FadeInSection>
        </section>
    )
}