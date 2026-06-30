import { Slider } from "@/gql/graphql";
import FadeInSection from "@/components/animation/FadeInSection";
interface Props {
    slider: Slider;
    tailwindParent: string
    tailwind: string
}

const randomColor = [
    "--color-bg-100",
    "--color-bg-33",
    "--color-bg-0",
    "--color-round-0",]
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * randomColor.length);
    return randomColor[randomIndex];
}
export default function PhotoCards({slider, tailwind, tailwindParent}: Props) {
    const color = getRandomColor();
    const color2 = getRandomColor();
    return <div className={`scroll-photo absolute inset-0 h-screen w-full flex ${tailwindParent}`} style={{background: `linear-gradient(0.25turn, var(${color}), var(${color2}))`}}>
        <img className={`${tailwind}`}    src={slider.sliderImage} alt={slider.sliderTitle} />
        <FadeInSection resetOnExit={true} tailwind="w-full flex justify-center items-center">
        <span className="text-photo font-elegant w-full flex justify-center items-center text-wrap text-center text-txSecond lg:text-2xl md:text-2xl text-xl">
           {slider.sliderText}
        </span>
        </FadeInSection>
    </div>
}