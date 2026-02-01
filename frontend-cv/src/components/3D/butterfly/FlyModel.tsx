import { Float, useAnimations, useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

useGLTF.preload("/model/animated_butterfly_copy.glb")

export default function FlyModel({rotation = [0, Math.PI / 2, 0]}: {rotation?: [x: number, y: number, z: number, order?: THREE.EulerOrder | undefined]}) {
    const group = useRef<THREE.Group>(null!);
    const progress = useRef(0);
    const { animations, scene } = useGLTF("/model/animated_butterfly_copy.glb");
    const { actions } = useAnimations(animations, scene);

    useFrame(() => {
        const action = actions?.["Flying"]
        if (!action) return
        action.play();
    })
    return (
        <>
          <Float>
                <group scale={1.5} ref={group} position={[0, 0, 0]} dispose={null} rotation={rotation}>
                    <primitive object={scene} />
                </group>
                </Float>
            </>
    )
}