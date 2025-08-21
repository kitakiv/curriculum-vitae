"use client"
import { useState, useEffect } from 'react';
export default function HeaderSecondText({text}: {text: string}) {
    const [length, setLength] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setLength((prevLength) => (prevLength >= text.length ? 0 : prevLength + 1));
        }, 200);

        return () => clearInterval(intervalId);
      }, []);

    return (
        <span className="text-wrap min-h-[65px] text-center text-txSecond lg:text-2xl w-2/4 md:text-2xl text-xl">
            {text.slice(0, length)}
        </span>
    )
}