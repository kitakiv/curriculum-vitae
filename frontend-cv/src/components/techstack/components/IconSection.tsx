'use client'

import techStack, { techStacks } from "@/variables/techstack/techstack";
import TechStackIcon from "./TechStackIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IconSection(){

    useGSAP(() => {
        gsap.fromTo('.tech-stack-icon', 
          {
            y: 50,
            opacity: 0,
          }, 
          {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `#${techStack.id}`,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        )
    }, []);
    return <div className="grid xl:grid-cols-8 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-4">{
        techStacks.map((techStack, index) => (
            <div className="relative tech-stack-icon" key={`techStack-${index}`} >
                <TechStackIcon icon={techStack.logo} name={techStack.techName} />
            </div>
        ))
        }</div>
}