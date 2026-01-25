"use client"
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ModelRobot from "@/components/3D/robot/ModelRobot";
import Loader from "@/components/3D/Loader";
import { Center, OrbitControls } from "@react-three/drei";

export default function SceneRobot({ tailwind }: { tailwind?: string}) {
    return (
        <div id="canvas-container-robot" className={tailwind}>
            <Canvas>
                <directionalLight position={[0, 0, 5]} intensity={8} />

                <Suspense fallback={<Loader />}>
                    <Center>
                    <OrbitControls enableZoom={false}/>
                    <ModelRobot />
                    </Center>
                </Suspense>
            </Canvas>
        </div>
    )
}