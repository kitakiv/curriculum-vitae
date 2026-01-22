"use client"
import { useState, useEffect } from 'react';
export default function HeaderSecondText({text}: {text: string}) {
    const [length, setLength] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setLength((prevLength) => (prevLength >= text.length ? 0 : prevLength + 1));
        }, 200);

        return () => clearInterval(intervalId);
      }, [text.length]);

    return (
      <span className="flex items-center relative z-40 justify-center col-span-10 col-start-3 col-end-11 row-span-11 row-start-9 row-end-12">
        <span className="text-wrap opacity-0 text-center text-txSecond lg:text-2xl md:text-2xl text-xl">
           {`${text}|`}
        </span>
        <span className="absolute font-elegant text-wrap text-center text-txSecond lg:text-2xl md:text-2xl text-xl">
           {`${text.slice(0, length)}|`}
        </span>
      </span>
    )
}