'use client'
import { useRef, MouseEvent } from "react";
export default function CardWrapper({ children, tailwind }: { children: React.ReactNode, tailwind?: string }) {
    const border = useRef<HTMLDivElement | null>(null);
    function handleMove(e: MouseEvent<HTMLDivElement>) {
        if (!(border.current)) return;
        const rect = border.current.getBoundingClientRect();

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        border.current.style.setProperty('--angle', `${angle}deg`);
    }

    return (
            <div ref={border} className={`${tailwind}  rounded-xl  angle-box`} onMouseMove={(e) => handleMove(e)}>{children}</div>
    )
}