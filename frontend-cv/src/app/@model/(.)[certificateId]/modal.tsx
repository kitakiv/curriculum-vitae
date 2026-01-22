'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export function Modal({ certificateId }: { certificateId: string }) {
    const router = useRouter();
    const element = useRef(null);


    function onDismiss(e: React.MouseEvent<HTMLDivElement>) {
        console.log("clicked", e.target, element.current);
        if (e.target === element.current) {
          router.back();
        }
      }
    return (
        <div id={`modal-${certificateId}`} ref={element} onClick={onDismiss} className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center liquid-glass-burger z-50 padding-elements">
            <div></div>
            <img src={`/image/${certificateId}`} alt={certificateId} className="rounded-3xl xl:w-1/3 lg:w-1/3 md:w-2/3 w-full h-auto object-contain"  />
        </div>
    )
}