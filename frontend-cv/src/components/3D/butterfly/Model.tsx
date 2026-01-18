import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"
import * as THREE from "three"

useGLTF.preload("/model/animated_butterfly.glb")

export default function Model() {
    const group = useRef<Group>(null)
    const { nodes, materials, animations, scene } = useGLTF("/model/animated_butterfly.glb");
    const { actions, clips } = useAnimations(animations, scene)
    const scroll = useScroll()

    // useEffect(() => {
    //     const action = actions?.["Flying"]
    //     if (!action) return

    //     action.play()
    //     action.paused = true
    //   }, [actions])
    // useFrame(() => {
    //     const action = actions?.["Flying"]
    //     if (!action) return
    //     action.time = (action.getClip().duration * scroll.offset) / 2
    //   })
    useFrame(() => {
        const action = actions?.["Flying"]
        if (!action) return

        action.play()
    })
    return (
        <group ref={group} scale={1.5} dispose={null} rotation={[0, Math.PI / 3, Math.PI / 7]}>
            <primitive object={scene} />
        </group>
    )
}