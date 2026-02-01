'use client'

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export default function TimeLine() {
    useGSAP(() => {
      gsap.to('.timeline', {
        transformOrigin: 'bottom bottom',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 40%',
          end: '70% center',
          onUpdate: (self) => {
            gsap.to('.timeline', 
              {
                height: `${self.progress * 100}%`
               })
          }
        }
      }
      )
    }, []);
    return (
    <div className="flex justify-center items-start col-span-1 col-start-1 col-end-2 row-span-1 row-start-1 row-end-1">
      <div className="timeline w-1 from-txFirst100 rounded-full h-full to-txFirst0 bg-gradient-to-b"/>
    </div>
    )
}