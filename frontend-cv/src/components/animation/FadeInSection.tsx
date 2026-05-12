'use client';
import {useState, useEffect, useRef} from 'react';


interface Props {
    children: React.ReactNode,
    tailwind?: string,
    delay?: number,
    animation?: {visible: string, hidden: string},
    resetOnExit?: boolean
}

export default function FadeInSection({children, tailwind, delay = 300, animation = {visible: "translateY(0)", hidden: "translateY(120px)"}, resetOnExit = false}: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    if (!resetOnExit) {
                        observer.unobserve(entry.target);
                    }
                } else if (resetOnExit) {
                    setIsVisible(false);
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    if (ref.current) {
        observer.observe(ref.current);
    }

    return () => observer.disconnect();
}, [resetOnExit]);

    return (
        <div  className={`transition-all duration-1000 ${tailwind} ease-out transform`}  ref={ref} style={{opacity: isVisible ? 1 : 0, transform: isVisible ? animation.visible : animation.hidden, transitionDelay: `${delay}ms`}}>{children}</div>
    )
}