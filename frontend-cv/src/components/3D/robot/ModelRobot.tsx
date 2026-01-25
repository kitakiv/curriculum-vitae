import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

useGLTF.preload("/model/robot_playground.glb")

export default function ModelRobot() {

    const group = useRef<THREE.Group>(null!);
    const { animations, scene } = useGLTF("/model/robot_playground.glb");
    const { actions } = useAnimations(animations, scene);



    useFrame(() => {
        const action = actions?.["Experiment"]
        if (!action) return

        action.play()
    })
    return (
        <>
                <group  ref={group} position={[0, 0, 0]} scale={1.3} dispose={null}>
                    <primitive object={scene} />
                </group>
            </>
    )
}