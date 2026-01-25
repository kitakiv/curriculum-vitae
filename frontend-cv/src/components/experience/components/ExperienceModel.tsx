'use client'
import dynamic from "next/dynamic"

const SceneRobot = dynamic(() => import('@/components/3D/robot/SceneRobot'), {
    ssr: false,
});

export default function ExperienceModel() {
    return <>
        <SceneRobot tailwind="sticky top-[30vh] left-0 w-full h-[25vw] col-span-3 col-start-5 col-end-8" />
    </>
}