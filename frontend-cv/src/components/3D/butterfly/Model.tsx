import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three";
import { Line } from '@react-three/drei'

useGLTF.preload("/model/animated_butterfly.glb")

export default function Model() {
    const { viewport } = useThree();
    const left = useRef(viewport.width / 2 - viewport.width / 6);
    const right = useRef(left.current * -1);
    const top = useRef(-1 * (viewport.height / 2 - 2));
    const bottom = useRef(top.current * -1);
    const group = useRef<THREE.Group>(null!);
    const progress = useRef(0);
    const { animations, scene } = useGLTF("/model/animated_butterfly.glb");
    const { actions } = useAnimations(animations, scene);
    const curve = useRef<THREE.CatmullRomCurve3>(null!);
    curve.current = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(left.current, top.current, 0),
            new THREE.Vector3(left.current * 0.5, top.current * 0.8, 2),
            new THREE.Vector3(0, 0, -2),
            new THREE.Vector3(right.current * 0.5, bottom.current * 0.8, 2),
            new THREE.Vector3(right.current, bottom.current, 0),
        ], true, "centripetal", 2);
    }, []);

    useEffect(() => {
        left.current = (viewport.width / 2 - viewport.width / 6);
        right.current = left.current * -1;
        top.current = -1 * (viewport.height / 2 - 2);
        bottom.current = top.current * -1;
        curve.current = new THREE.CatmullRomCurve3([
            new THREE.Vector3(left.current, top.current, 0),
            new THREE.Vector3(left.current * 0.5, top.current * 0.8, 2),
            new THREE.Vector3(0, 0, -2),
            new THREE.Vector3(right.current * 0.5, bottom.current * 0.8, 2),
            new THREE.Vector3(right.current, bottom.current, 0),
        ], true, "centripetal", 2);
    }, [viewport]);

    const linePoints = useMemo(() => {
        return curve.current.getPoints(100);
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

        const position = curve.current.getPoint(progress.current)
        const tangent = curve.current.getTangent(progress.current)

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
            {/* <Line
                points={linePoints}
                color={"white"}
                linewidth={1} /> */}
            {/* <Float speed={1.5} rotationIntensity={1} floatIntensity={2}> */}
                <group scale={0.4} ref={group} position={[1, 1, 0]} dispose={null} rotation={[0, Math.PI / 3, Math.PI / 7]}>
                    <primitive object={scene} />
                </group>
            {/* </Float> */}
            </>
    )
}