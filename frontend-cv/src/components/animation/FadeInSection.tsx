'use client';
import {useState, useEffect, useRef} from 'react';

export default function FadeInSection({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            {threshold: 0.1}
        )

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={`transition-all duration-1000 ${tailwind} ease-out transform`}  ref={ref} style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(100px)', transitionDelay: '300ms'}}>{children}</div>
    )
}