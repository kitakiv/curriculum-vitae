'use client'
import FadeInSection from "@/components/animation/FadeInSection"
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "@/components/3D/butterfly/Loader";


const Scene = dynamic(() => import('@/components/3D/butterfly/Scene'), {
    ssr: false,
});

export default function HeaderTitle({textFirst, textSecond}: {textFirst: string, textSecond: string}) {
    return (
        <>
        <FadeInSection tailwind="relative col-span-12 col-start-1 row-span-2 row-start-3 row-end-5 flex justify-start lg:items-center md:items-center sm:items-center items-center  relative z-10" delay={800} animation={{visible: "translateX(0)", hidden: "translateX(-50%)"}}>
            <span className=" lg:text-9xl md:text-9xl sm:text-7xl  text-6xl bg-gradient-to-r from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-extrabold text-shadow-bg0 peer-hover:animate-pulse">{textFirst.toUpperCase()}</span>
            <Scene tailwind="absolute -top-1/2 -translate-x-1/3 w-15 h-15" />
        </FadeInSection>
        <FadeInSection tailwind="col-span-12 col-start-1 flex justify-end row-span-2 row-start-7 lg:row-end-10 row-end-9 lg:items-end md:items-end sm:items-start items-start relative z-30"  delay={1600} animation={{visible: "translateX(0)", hidden: "translateX(50%)"}}><span className="lg:text-9xl md:text-9xl sm:text-7xl text-6xl bg-gradient-to-r from-txFirst100 to-txFirst0 bg-clip-text text-transparent font-extrabold z-40 text-shadow-bg0 peer-hover:animate-pulse">{textSecond.toUpperCase()}</span></FadeInSection>
        </>
    )
}