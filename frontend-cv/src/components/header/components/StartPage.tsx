import Image from "next/image";
import Rounds from "@/components/header/components/Rounds";
import PinkButton from "@/components/button/PinkButton";
export default function StartPage() {
    return (
        <div className="w-full h-full position-relative overflow-hidden">
            <Rounds/>
            <span className="absolute lg:text-9xl md:text-8xl sm:text-7xl lg:left-11 sm:left-11 left-8 lg:top-9 md:top-11 sm:top-14 text-5xl bg-gradient-to-r from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-extrabold text-shadow-bg0">FULLSTACK</span>
            <span className="absolute lg:text-9xl md:text-8xl sm:text-7xl lg:right-11 sm:right-11 right-8 text-5xl lg:top-96 sm:top-96 top-80 bg-gradient-to-r from-txFirst100 to-txFirst0 bg-clip-text text-transparent font-extrabold z-20 text-shadow-bg0">DEVELOPER</span>
            <div className="absolute lg:top-32 md:top-28 sm:top-24 top-24 left-1/2 -translate-x-1/2 lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56">
            <Image src="/image/developer.jpg" alt="developer" width={320} height={320} className="bg-black rounded-full z-10 stroke-bg100 shadow-bg0 shadow-lg object-cover w-full h-full" />
            </div>
            <span className="absolute text-wrap text-center text-txSecond lg:text-2xl w-2/4 md:text-2xl text-xl lg:bottom-28  sm:bottom-28 bottom-1/4 left-1/2 -translate-x-1/2">Hi, I'm Victoria — a developer, dancer, and dream chaser Creating digital</span>
            <PinkButton tailwind="absolute lg:bottom-10 sm:bottom-14 bottom-20 left-1/2 -translate-x-1/2">START</PinkButton>
        </div>
    );
}