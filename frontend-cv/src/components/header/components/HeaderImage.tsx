'use client';
import FadeInSection from "@/components/animation/FadeInSection";
import header from "@/variables/header/header";
import { useState, useEffect, useRef } from "react";



export default function HeaderImage({images}: {images: string[]}) {

    const [index, setIndex] = useState(0);
    const imageRefFirst = useRef<HTMLImageElement>(null);
    const imageRefSecond = useRef<HTMLImageElement>(null);
  useEffect(() => {
    imageRefFirst.current?.classList.add("image");
    imageRefSecond.current?.classList.add("image-second");
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, header.defaultImageChange);

    return () => clearInterval(interval);
  }, [images]);
    return (
        <div className="relative z-30 col-span-12 col-start-1 row-span-4 row-start-4 row-end-8 flex justify-center items-center ">
        <div ref={imageRefFirst} className="absolute shadow-lg rounded-full z-30 transition duration-700 lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56 peer hover:z-40">
            {/* @eslint-disable-next-line */}
            <img src={images[index]} alt={`Profile image ${index + 1}`}  className="transition-all  duration-700 bg-bg0 rounded-full stroke-bg100 object-cover w-full h-full" />
        </div>
        <div ref={imageRefSecond} className="absolute z-20 rounded-full shadow-lg shadow-txSecond transition duration-700 lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56 peer hover:z-40">
            {/* @eslint-disable-next-line */}
            <img src={images[index]} alt={`Profile image ${index + 1} second`}  className="transition-all grayscale duration-700 bg-bg0 rounded-full stroke-bg100 object-cover w-full h-full" />
        </div>
        </div>
    );
}