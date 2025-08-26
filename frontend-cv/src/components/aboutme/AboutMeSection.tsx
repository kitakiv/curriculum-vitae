import TextGray from "@/components/text/TextGray"
import TextHeading from "@/components/text/TextHeading"
import aboutme from "@/variables/aboutme/aboutme"
import Slider from "@/components/aboutme/components/Slider"
export default function AboutMeSection() {
    return (
        <section className="flex flex-col items-center justify-center lg:py-16 md:py-14 sm:py-12 py-10 lg:px-6 md:px-6 sm:px-4 px-4 gap-4 w-full" id={aboutme.id}>
            <TextHeading>{aboutme.heading}</TextHeading>
            <TextGray tailwind="text-center">{aboutme.text}</TextGray>
            <Slider />
        </section>
    )
}