'use client'
import FlyModel from "@/components/3D/butterfly/FlyModel";
import flyModel from "@/variables/3d/flymodel";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import Loader from "./Loader";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from "gsap/ScrollTrigger";
import header from "@/variables/header/header";
import * as THREE from 'three';
import { Center } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger)


export default function FlyModelSection() {
  const block = useRef<HTMLDivElement>(null!);
  const [rotateY, setRotateY] = useState(0);
  const screenHeight = window.innerHeight;
  const objectWidth = 25;
  const objectHeight = 35;
  const screenWidth = window.innerWidth - screenHeight / 100 * objectWidth;
  const threeScreenOfObject = 2.3;
  const prevX = useRef(0);
  const prevY = useRef(0);
  const smoothDX = useRef(0);
  const currentScale = useRef(1);
  const minScale = 1;
  const maxScale = 1.5;
  const centerX = screenWidth / 2;
  const maxDistance = screenWidth;
  useGSAP(() => {
    gsap.to({}, {
      scrollTrigger: {
        trigger: `#${header.id}`,
        start: "top top",
        end: `+=${screenHeight * threeScreenOfObject}`,
        scrub: 1,
        pin: `#canvas-container-${flyModel.id}`,
        onUpdate: (self) => {
          const progress = ((self.progress - 0.25) * 2); // t = (t - 0.25) * 2
          const x = Math.sin(progress * Math.PI) * (screenWidth / 2) + (screenWidth / 2); // x = (screenWidth / 2)sin(πt) + screenWidth / 2)
          const dx = x - prevX.current;
          prevX.current = x;
          const maxYaw = Math.PI * 0.5; // ~30°;
          const prevSmoothDX = smoothDX.current;
          smoothDX.current += (dx - prevSmoothDX) * 0.5;
          const targetYaw = THREE.MathUtils.clamp(
            smoothDX.current * 0.03,
            -maxYaw,
            maxYaw
          )
          const prev = prevY.current;
          prevY.current +=
          (targetYaw - prev) * 0.0001;
          const differ = Math.abs(centerX - x);
          const t = 1 - Math.min(differ / maxDistance, 1);
          const scale = minScale + t * (maxScale - minScale);
          currentScale.current = scale;
          currentScale.current += (scale - currentScale.current) * 0.1;
          block.current.style.width = `${currentScale.current * objectWidth}vh`;
          block.current.style.height = `${currentScale.current * objectHeight}vh`;
          block.current.style.transform = `translateX(${x}px) scale(${currentScale.current})`;// y = (screenHeight / 2)sin(πt) + screenHeight / 2)
          setRotateY(targetYaw);
        },
      }
    })
  }, [document.documentElement.scrollHeight, document.documentElement.scrollWidht]);
  return <section className="w-full" id={flyModel.id}>
    <div ref={block} className="absolute z-[35] left-0 top-[15vh] w-[25vh] h-[35vh] rotate-90 transition-all duration-100" id={`canvas-container-${flyModel.id}`}>
      <Canvas>
        <directionalLight position={[0, 0, 5]} intensity={8} />
        <Suspense fallback={<Loader />}>
          <FlyModel rotation={[0, rotateY, 0]} />

        </Suspense>
      </Canvas>
    </div>
  </section>
}