"use client"
import {useState} from "react"
import Image from "next/image"

const imagesDefault = ["/image/developer1.jpg", "/image/developer2.jpg", "/image/developer3.jpg"];
export default function Slider({images = imagesDefault}: {images: string[]}) {
    const [mainImage, setMainImage] = useState(0);

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
    return (<div className={`h-96 lg:w-2/3 sm:w-4/5 w-5/6 relative overflow-hidden flex bg-gradient-to-r from-txSecond to-bg0`}>
        <div className="absolute top-1/2 left-3  -translate-y-1/2 w-11 h-11 bg-bg0 rounded-full z-50 transition duration-700 border-light border-2 hover:scale-110"  onClick={changeLeft}></div>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 w-11 h-11 bg-bg0 rounded-full z-50 transition duration-700 border-light border-2 hover:scale-110 " onClick={changeRight}></div>
        <div className={`transition duration-700 flex w-full h-full -translate-x-[${mainImage * 100}%]`}>
        {images.map((image, index) => {
            return (
                <div key={`image-slider-${index}`} className="flex-shrink-0 w-[100%] h-full relative">
                    <Image src={image} alt="developer" width={300} height={300} className={`image-mask transition duration-700  w-fit h-full absolute right-0 top-0`} />
                </div>
            )
        })}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex gap-1">
            {images.map((image, index) => {
                return (
                    <div className="lg:w-9 lg:h-9 md:w-11 md:h-11 sm:w-20 sm:h-20 w-20 h-20 flex items-center justify-center group" key={`image-slider-dot-${index}`} onClick={() => setMainImage(index)}>
                        <div className={`w-3 h-3 rounded-full transition duration-700 ${mainImage === index ? "bg-gradient-to-br from-txFirst100 to-txFirst0" : "bg-light  group-hover:scale-125 cursor-pointer group-hover:bg-txFirst0"}`}></div>
                    </div>
                )
            })}

        </div>
    </div>)

}