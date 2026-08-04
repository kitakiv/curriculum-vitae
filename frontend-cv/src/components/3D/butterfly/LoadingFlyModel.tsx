'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import flymodel from '@/variables/3d/flymodel';
import Image from 'next/image';

gsap.registerPlugin(MotionPathPlugin)

export default function LoadingFlyModel() {
  const widthButterfly = 64;
  const numberOfButterflies = 7;
  useEffect(() => {
  const butterflies = gsap.utils.toArray<HTMLElement>(".butterfly-image");

  butterflies.forEach((butterfly, index) => {
    gsap.to(butterfly, {
      duration: 4,
      repeat: -1,
      ease: "none",
      motionPath: {
        path: "#orbit",
        align: "#orbit",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: index / butterflies.length + 1,
        end: index / butterflies.length,
      },
    });
  });
}, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg width="300" height="300">
  <path
    id="orbit"
    d="M150,50
       A100,100 0 1,1 149.9,50"
    fill="none"
  />
</svg>
    {
      numberOfButterflies > 0 && Array.from({ length: numberOfButterflies }).map((_, index) => (
        <div key={index} className="butterfly-image absolute w-16 h-16">
          <Image src={flymodel.loadingButterflySvg} width={widthButterfly - (index * 4)} height={widthButterfly -(index + 1)}  className="flex justify-center items-center rotate-[90deg]" />
        </div>
      ))
    }

    </div>
  );
}