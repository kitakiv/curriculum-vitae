import { getSlidersCached } from "@/query/slider.query";
import SrollPhotos from "./components/SrollPhotos";

export default async function PhotoSection() {
    const sliders = await getSlidersCached();
    return <SrollPhotos sliders={sliders} />
}