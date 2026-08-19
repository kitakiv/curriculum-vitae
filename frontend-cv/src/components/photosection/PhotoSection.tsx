import { getSlidersCached } from "@/query/slider.query";
import SrollPhotos from "./components/SrollPhotos";
import FadeInSection from "@/components/animation/FadeInSection";
import TextPortfolio from "../text/TextPortfolio";
import TextHeading from "../text/TextHeading";
import TextGray from "../text/TextGray";
import photo from "@/variables/photo/photo";


export default async function PhotoSection() {
    const sliders = await getSlidersCached();
    return <section className='flex flex-col w-full items-center justify-center gap-4 ' id={photo.id}>
        <FadeInSection>
            <TextPortfolio tailwind="text-center">{photo.portfolio}</TextPortfolio>
            <TextHeading>{photo.heading}</TextHeading>
        </FadeInSection>
        <FadeInSection>
            <TextGray tailwind="text-center">{photo.text}</TextGray>
        </FadeInSection>
        <SrollPhotos sliders={sliders} />
    </section>
}