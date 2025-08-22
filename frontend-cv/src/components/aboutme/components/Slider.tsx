"use client"
import {useState} from "react"
import Image from "next/image"
export default function Slider() {
    const [mainImage, setMainImage] = useState(0);
    const [tailwind, setTailwind] = useState("");

    function changeLeft() {
        setMainImage((prev) => {
            if (prev === 0) {
                return images.length - 1;
            } else {
                return prev - 1;
            }
        })
    }

    function changeRight() {
        setMainImage((prev) => {
            if (prev === images.length - 1) {
                return 0;
            } else {
                return prev + 1;
            }
        })

    }

    const images = ["/image/developer1.jpg", "/image/developer2.jpg", "/image/developer3.jpg"];
    return (<div className={`lg:w-2/3 sm:w-4/5 w-5/6 h-96 relative overflow-hidden flex  justify-end`}>
        <div className="absolute top-1/2 left-3  -translate-y-1/2 w-11 h-11 bg-bg0 rounded-full z-50 transition duration-700 border-light border-2 hover:scale-110"  onClick={changeLeft}></div>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 w-11 h-11 bg-bg0 rounded-full z-50 transition duration-700 border-light border-2 hover:scale-110 " onClick={changeRight}></div>
        <div className="z-20 w-full h-full absolute top-0 left-0 bg-gradient-to-r from-bg0 from-0% via-bg100 lg:via-65%  md:via-55% sm:via-45% via-35% to-bg100-0 lg:to-85% md:to-75% sm:to-65% to-55%"></div>
        <Image src={images[mainImage]} alt="developer" width={384} height={384} className={`absolute top-0 right-0 h-full w-fit transition-transform duration-1000 translate-x-0 ${tailwind}`}></Image>
    </div>)
}