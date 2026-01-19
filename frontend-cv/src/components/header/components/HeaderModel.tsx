'use client'
import dynamic from "next/dynamic";

const Scene = dynamic(() => import('@/components/3D/butterfly/Scene'), {
    ssr: false,
});


export default function HeaderModel() {
    return <>
         <Scene tailwind="absolute z-[35] insert-0 w-screen h-screen top-0 left-0" />
    </>
}