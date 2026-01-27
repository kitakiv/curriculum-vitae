'use client'
import dynamic from "next/dynamic"

const SceneRobot = dynamic(() => import('@/components/3D/robot/SceneRobot'), {
    ssr: false,
});

export default function ExperienceModel() {
    return <>
        <SceneRobot tailwind="sticky top-[30vh] left-0 w-full h-[25vw] xl:col-span-3 xl:col-start-5 xl:col-end-8 md:col-span-3 md:col-start-5 md:col-end-8 lg:col-span-3 lg:col-start-5 lg:col-end-8" />
    </>
}