import Image from "next/image";
import FadeInSection from "@/components/animation/FadeInSection";

export default function HeaderImage({path, alt = "developer"}: {path: string, alt?: string}) {
    return (
        <FadeInSection>
        <div className="transition duration-700 hover:-skew-x-12 group absolute lg:top-32 md:top-28 sm:top-24 top-24 left-1/2 -translate-x-1/2 lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56 peer z-10 hover:z-40">
            <Image src={path} alt={alt} width={320} height={320} className="transition-all duration-700 bg-bg0 rounded-full z-10 stroke-bg100 object-cover w-full h-full group-hover:shadow-2xl group-hover:shadow-txSecond" />
        </div>
        </FadeInSection>
    );
}