import { Float, Line, useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { Group } from "three"
import * as THREE from "three"

useGLTF.preload("/model/animated_butterfly.glb")

export default function Model() {
    const NUMBER_OF_POINTS = 2500;
    const { viewport } = useThree();
    const left = (viewport.width / 2 - 3);
    const right = left * -1;
    const top = -1 * (viewport.height / 2 - 2);
    const bottom = top * -1;
    const group = useRef<THREE.Group>(null!);
    const progress = useRef(0);
    const { nodes, materials, animations, scene } = useGLTF("/model/animated_butterfly.glb");
    const { actions, clips } = useAnimations(animations, scene);

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(left, top, 0),
            new THREE.Vector3(left * 0.5, top * 0.8, 2),
            new THREE.Vector3(0, 0, -2),
            new THREE.Vector3(right * 0.5, bottom * 0.8, 2),
            new THREE.Vector3(right, bottom, 0),
        ], true, "centripetal", 2);
    }, []);

    const linePoints = useMemo(() => {
        return curve.getPoints(NUMBER_OF_POINTS);
    }, [curve]);


    useFrame((state, delta) => {
        const action = actions?.["Flying"]
        if (!action) return

        action.play()
        progress.current += delta * 0.07;
        progress.current = Math.min(progress.current, 1);
        if (progress.current >= 1) {
            progress.current = 0;
        }

        const position = curve.getPoint(progress.current)
        const tangent = curve.getTangent(progress.current)

        group.current.position.copy(position);
        group.current.rotation.y = Math.atan2(
            tangent.x,
            tangent.z
          )
          // slight up-down flutter
        group.current.rotation.z =
            Math.sin(state.clock.elapsedTime * 2) * 0.0001
    })
    return (
        <>
            {/* <Float speed={1.5} rotationIntensity={1} floatIntensity={2}> */}
                <group scale={0.4} ref={group} position={[1, 1, 0]} dispose={null} rotation={[0, Math.PI / 3, Math.PI / 7]}>
                    <primitive object={scene} />
                </group>
            {/* </Float> */}
            </>
    )
}