'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Slider } from '@/gql/graphql';

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
        sliders.map(slider => {
            return (
                 <img
                 key={slider.id}
            src={slider.sliderImage}
        className="scroll-photo absolute inset-0 h-screen w-auto object-cover"
      />

            )
        })
      }
    </div>
  );
}