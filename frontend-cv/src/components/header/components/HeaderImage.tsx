import Image from "next/image";
import FadeInSection from "@/components/animation/FadeInSection";

export default function HeaderImage({path, alt = "developer"}: {path: string, alt?: string}) {
    return (
        <FadeInSection tailwind="relative z-30 col-span-12 col-start-1 row-span-4 row-start-4 row-end-8 flex justify-center items-center ">
        <div className="absolute shadow-lg rounded-full image z-30 transition duration-700 lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56 peer hover:z-40">
            <img src={path} alt={alt}  className="transition-all  duration-700 bg-bg0 rounded-full stroke-bg100 object-cover w-full h-full" />
        </div>
        <div className="absolute image-second z-20 rounded-full shadow-lg shadow-txSecond transition duration-700 lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56 peer hover:z-40">
            <img src={path} alt={alt}  className="transition-all grayscale duration-700 bg-bg0 rounded-full stroke-bg100 object-cover w-full h-full" />
        </div>
        </FadeInSection>
    );
}