'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const element = useRef(null);


    function onDismiss(e: React.MouseEvent<HTMLDivElement>) {
        console.log("clicked", e.target, element.current);
        if (e.target === element.current) {
          router.back();
        }
      }
    return (
        <div id={`modal-window`} ref={element} onClick={onDismiss} className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center liquid-glass-burger z-50 padding-elements">
            {children}
        </div>
    )
}