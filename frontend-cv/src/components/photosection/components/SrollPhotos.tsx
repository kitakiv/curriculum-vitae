'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Slider } from '@/gql/graphql';
import PhotoCards from './PhotoCards';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    sliders: Slider[]
}
export default function SrollPhotos({sliders}: Props) {
  useGSAP(() => {
    const images = gsap.utils.toArray<HTMLImageElement>(
      '.scroll-photo'
    );

    // place all except first below viewport
    images.forEach((img, index) => {
      if (index !== 0) {
        gsap.set(img, {
          yPercent: 100,
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-wrapper',
        start: 'top top',
        end: `+=${images.length * window.innerHeight}`,
        scrub: true,
        pin: true,
        pinSpacing: true
      },
    });

    images.forEach((item, index) => {
      tl.to(item, {
        scale: 0.9,
        borderRadius: "10px",
      });
    });

    images.forEach((img, index) => {
      if (index !== 0) {
        tl.to(
          img,
          {
            yPercent: 0,
            duration: 1,
            ease: 'none',
          },
          index
        );
      }
    });
  });

  return (
    <div className="scroll-wrapper h-screen relative w-full  overflow-hidden" >
      {
        sliders.map((slider, index) => {
          const mask = (index + 2) % 2 === 0 ? "image-mask-right-photo" : "image-mask-left-photo";
            return (
                <PhotoCards tailwindParent={` flex items-stretch  ${index === 0 ? "flex-row" : "flex-row-reverse"}`} tailwind={`h-full w-auto transition duration-700 ${mask}`} key={slider.id} slider={slider} />

            )
        })
      }
    </div>
  );
}