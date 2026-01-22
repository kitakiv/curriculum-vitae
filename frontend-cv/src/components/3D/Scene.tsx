"use client"
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "./Loader";

export default function Scene({ tailwind, children }: { tailwind?: string, children: React.ReactNode }) {
    return (
        <div id="canvas-container" className={tailwind}>
            <Canvas>
                <directionalLight position={[0, 0, 5]} intensity={8} />

                <Suspense fallback={<Loader />}>
                        {children}
                </Suspense>
            </Canvas>
        </div>
    )
}