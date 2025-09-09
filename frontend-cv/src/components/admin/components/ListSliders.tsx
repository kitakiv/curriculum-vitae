


import { SliderText } from "@/types/index";
import { imagesDefault, imagesTitle } from "@/variables/aboutme/aboutme";
import MoreInfoBlock from "@/components/form/MoreInfoBlock";
import SliderForm from "./SliderForm";
import TitleContent from "./TitleContent";

export default function ListSliders({ images = imagesDefault, titles = imagesTitle, type }: { images?: string[], titles?: SliderText[], type: "add" | "edit" }) {
    return (
        <>
        {images.map((image, index) => (
            <MoreInfoBlock key={`slider-admin-${index}`} tailwind="px-4 py-2 flex flex-col"
            titleChildren={<TitleContent tailwind='flex gap-2 items-center' title={titles[index].title} image={image} />}
            >
                <SliderForm type={type}  sliderInfo={{title: titles[index].title, text: titles[index].text, image: image}} />
            </MoreInfoBlock>
        ))}
        </>
    )
}
