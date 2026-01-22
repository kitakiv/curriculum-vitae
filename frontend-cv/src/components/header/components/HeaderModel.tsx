'use client'
import Model from "@/components/3D/butterfly/Model";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import('@/components/3D/Scene'), {
    ssr: false,
});


export default function HeaderModel() {
    return <>
         <Scene tailwind="absolute z-[35] insert-0 w-screen h-screen top-0 left-0">
            <Model />
         </Scene>
    </>
}