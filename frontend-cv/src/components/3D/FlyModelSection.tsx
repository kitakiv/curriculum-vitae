
'use client';

import FlyModel from "@/components/3D/butterfly/FlyModel";
import flyModel from "@/variables/3d/flymodel";
import header from "@/variables/header/header";
import Loader from "./Loader";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FlyModelSection() {
  const block = useRef<HTMLDivElement>(null);
  const [rotateY, setRotateY] = useState(0);

  const objectWidth = 25;
  const objectHeight = 30;
  const threeScreenOfObject = 3;

  const prevX = useRef(0);
  const smoothDX = useRef(0);
  const currentScale = useRef(1);

  const minScale = 1;
  const maxScale = 1.3;

  useGSAP(() => {
    const canvasElement = block.current;

    if (!canvasElement) return;

    const getScreenWidth = () => {
      const height = window.innerHeight;
      return window.innerWidth - (height / 100) * objectWidth;
    };

    const animation = gsap.to({}, {
      scrollTrigger: {
        trigger: `#${header.id}`,
        start: "top top",
        end: () => `+=${window.innerHeight * threeScreenOfObject}`,
        scrub: 1,
        pin: canvasElement,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const screenWidth = getScreenWidth();

          const progress = (self.progress - 0.25) * 2;

          const x =
            Math.sin(progress * Math.PI) * (screenWidth / 2) +
            screenWidth / 2;

          const dx = x - prevX.current;
          prevX.current = x;

          const maxYaw = Math.PI * 0.5;

          smoothDX.current +=
            (dx - smoothDX.current) * 0.05;

          const targetYaw = THREE.MathUtils.clamp(
            smoothDX.current * 0.11,
            -maxYaw,
            maxYaw
          );

          const centerX = screenWidth / 2;

          const distance = Math.abs(centerX - x);

          const t =
            screenWidth > 0
              ? 1 - Math.min(distance / screenWidth, 1)
              : 0;

          const scale =
            minScale + t * (maxScale - minScale);

          currentScale.current +=
            (scale - currentScale.current) * 0.1;

          canvasElement.style.width = `${objectWidth}vh`;
          canvasElement.style.height = `${objectHeight}vh`;

          canvasElement.style.transform =
            `translateX(${x}px) scale(${currentScale.current})`;

          setRotateY(targetYaw);
        },
      },
    });

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, {
    dependencies: [],
    revertOnUpdate: true,
  });

  return (
    <section className="w-full" id={flyModel.id}>
      <div
        ref={block}
        className="absolute z-[35] pointer-events-none left-0 top-[15vh] rotate-90"
        id={`canvas-container-${flyModel.id}`}
        style={{
          width: `${objectWidth}vh`,
          height: `${objectHeight}vh`,
          transformOrigin: "center center",
        }}
      >
        <Suspense fallback={<Loader />}>
          <Canvas>
            <directionalLight
              position={[0, 0, 5]}
              intensity={8}
            />
            <FlyModel rotation={[0, rotateY, 0]} />
          </Canvas>
        </Suspense>
      </div>
    </section>
  );
}
