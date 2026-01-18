"use client"
import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense } from "react";
import Loader from "./Loader";
import { Scroll, OrbitControls, ScrollControls } from "@react-three/drei";

export default function Scene({tailwind}: {tailwind: string}) {
    return (
        <div id="canvas-container" className={tailwind}>
        <Canvas>
            <directionalLight position={[0, 0, 5]} intensity={8} />

            <Suspense fallback={<Loader />}>
                <Model />
            </Suspense>
        </Canvas>
        </div>
    )
}