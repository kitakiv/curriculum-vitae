import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import aboutme from "@/variables/aboutme/aboutme"
import SliderComponent from "./components/Slider"
import FadeInSection from "@/components/animation/FadeInSection"
import TextPortfolio from "../text/TextPortfolio"
import { getSlidersCached } from "@/query/slider.query"

export default async function AboutMeSection() {
    const sliders = await getSlidersCached();
    return (
        <section className="flex relative z-10 flex-col min-h-screen items-center justify-center gap-4 w-full padding overflow-hidden" id={aboutme.id}>
            <FadeInSection>
                <TextPortfolio tailwind="text-center">{aboutme.portfolio}</TextPortfolio>
                <TextHeading>
                    {aboutme.heading}
                </TextHeading>
            </FadeInSection>
            <FadeInSection>
                <TextGray tailwind="text-center">{aboutme.text}</TextGray>
            </FadeInSection>
            <FadeInSection tailwind="w-full flex items-center justify-center touch-pan-x">
                <SliderComponent key={"slider-block"} sliders={sliders}  />
            </FadeInSection>
            {/* <Scene tailwind="w-7 h-7" /> */}
        </section>
    )
}