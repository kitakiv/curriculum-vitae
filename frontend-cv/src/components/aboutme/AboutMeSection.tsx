'use client'
import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import aboutme from "@/variables/aboutme/aboutme"
import Slider from "@/components/aboutme/components/Slider"
import FadeInSection from "@/components/animation/FadeInSection"
import LiquidGlass from "../wrapper/LiquidGlass"
import TextPortfolio from "../text/TextPortfolio"

// const Scene = dynamic(() => import('@/components/3D/butterfly/Scene'), {
//     ssr: false,
// });
export default function AboutMeSection() {
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
                <Slider key={"slider-block"} />
            </FadeInSection>
            {/* <Scene tailwind="w-7 h-7" /> */}
        </section>
    )
}