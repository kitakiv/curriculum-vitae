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
          const mask = (index + 2) % 2 === 1 ? "image-mask-right-photo justify-start" : "image-mask-left-photo justify-end";
            return (
                <PhotoCards tailwindParent={` flex items-stretch items-stretch sm:flex-col flex-col-reverse  ${(index + 2) % 2 === 1 ? "lg:flex-row md:flex-row" : "lg:flex-row-reverse md:flex-row-reverse "}`} tailwind={`${mask}`} key={slider.id} slider={slider} />

            )
        })
      }
    </div>
  );
}