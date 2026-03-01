'use client';
import Rounds from "@/components/animation/Rounds";
import { useRef, MouseEvent } from "react";

export default function StartPage({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    const interactiveRound = useRef<HTMLDivElement | null>(null);

    function handleMove(e: MouseEvent<HTMLDivElement>) {
        const x = e.clientX;
        const y = e.clientY;
        interactiveRound.current!.style.top = `${y}px`;
        interactiveRound.current!.style.left = `${x}px`;
    }
    return (
        <div onMouseMove={(e) => handleMove(e)} className={`w-full h-full overflow-hidden ${tailwind}`}>
              <Rounds>
                <div ref={interactiveRound} id="interactive" className={`absolute interactive w-36 h-36 rounded-full opacity-50 overflow-hidden z-0 -translate-x-[50%] -translate-y-[50%]`}></div>
              </Rounds>
            {children}
        </div>
    );
}