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
        <span className="text-wrap lg:min-h-[65px] md:min-h-[70px] min-h-[85px] text-center text-txSecond lg:text-2xl w-2/4 md:text-2xl text-xl">
           {`${text.slice(0, length)}|`}
        </span>
    )
}