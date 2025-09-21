"use client"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { SliderText } from "@/types/index";
import TextBlack from "@/components/text/TextBlack";
import TextWhite from "@/components/text/TextWhite";
import { imagesDefault, imagesTitle } from "@/variables/aboutme/aboutme";
import reducer from "@/hooks/sliderCount";
import { useReducer } from "react";
import { CounterActionTypes } from "@/types/index";
export default function Slider({ images = imagesDefault, titles = imagesTitle }: { images?: string[], titles?: SliderText[] }) {
    const initialState = { sliderCount: 0, maxSliders: images.length };
    const [state, dispatch] = useReducer(reducer, initialState);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const widthRef = useRef<number>(0);
    const [width, setWidth] = useState(0);
    const swipe = 50;

    let startX = 0;

    function startAutoPlay() {
        stopAutoPlay();
        intervalRef.current = setInterval(() => {
           if (widthRef.current >= 100) {
            changeRight();
           } else {
            changeWidth();
           }
        }, 1000);
    }

    function changeWidth(makeZero: boolean = false) {
        if (makeZero) {
            widthRef.current = 0;
        } else {
            widthRef.current += 20;
        }
        setWidth(widthRef.current);
    }

    function stopAutoPlay() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    function changeLeft() {
        changeWidth(true);
        dispatch({ type: CounterActionTypes.PREVIOUSSLIDER, payload: { sliderCount: state.sliderCount, maxSliders: state.maxSliders} });
    }

    function changeRight() {
        changeWidth(true);
        dispatch({ type: CounterActionTypes.NEXTSLIDER, payload: { sliderCount: state.sliderCount, maxSliders: state.maxSliders} });

    }

    function handleSetSlider(sliderCount: number) {
        dispatch({ type: CounterActionTypes.SETSLIDER, payload: { sliderCount: sliderCount, maxSliders: state.maxSliders} });
    }

    function startTouch(event: React.TouchEvent<HTMLDivElement>) {
        stopAutoPlay();
        startX = event.touches[0].clientX;
        widthRef.current = 0;
    }

    function endTouch(event: React.TouchEvent<HTMLDivElement>) {
        const endX = event.changedTouches[0].clientX;
        if (startX - endX > swipe) {
            changeRight();
        } else if (startX - endX < swipe) {
            changeLeft();
        }
        startAutoPlay();

    }
    return (
        <>
            <div key="slider-left" className="absolute top-1/2 left-14  -translate-y-1/2 w-11 h-11 bg-bg0 rounded-full z-40 transition duration-700 border-light border-2 hover:scale-110" onClick={changeLeft}></div>
            <div key="slider-right" className="absolute top-1/2 right-14 -translate-y-1/2 w-11 h-11 bg-bg0 rounded-full z-40 transition duration-700 border-light border-2 hover:scale-110 " onClick={changeRight}></div>

            <div
                onTouchStart={startTouch}
                onTouchEnd={endTouch}
                onMouseEnter={stopAutoPlay}
                onMouseLeave={startAutoPlay}
                className={`lg:h-96 sm:h-80 h-64 lg:w-2/3 sm:w-5/6 w-full relative  overflow-hidden flex bg-gradient-to-r from-txSecond to-bg0`}>

                <div key="sliders-images" className="transition duration-500 flex w-full h-full ease-out" style={{ transform: `translateX(-${state.sliderCount * 100}%)` }}>
                    {images.map((image, index) => {
                        return (
                            <>
                                <div key={`image-slider-${index}`} className="flex-shrink-0 w-[100%] h-full relative">
                                    <Image src={image} alt="developer" width={300} height={300} className={`lg:image-mask sm:image-mask-sm image-mask transition duration-700  w-fit h-full absolute right-0 top-0`} />
                                </div>
                            </>
                        )
                    })}
                </div>

                <div key="sliders-titles" className="transition duration-1000 flex flex-col w-full h-full absolute top-0 left-0 easy-in-out" style={{ transform: `translateY(-${state.sliderCount * 100}%)` }}>
                    {titles.map((elem, index) => {
                        return (
                            <div key={`image-slider-title-${index}`} className="flex-shrink-0 w-[100%] h-full relative p-16 flex flex-col justify-end">
                                <TextWhite key={`image-slider-title-${index}`}>{elem.title}</TextWhite>
                                <TextBlack key={`image-slider-text-${index}`}>{elem.text}</TextBlack>
                            </div>
                        )
                    })}
                </div>


                <div key={"sliders-dots"} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex gap-1">
                    {images.map((_, index) => {
                        return (
                            <div key={`image-slider-dot-${index}`} className="lg:w-9 lg:h-9 md:w-11 md:h-11 sm:w-20 sm:h-20 w-20 h-20 flex items-center justify-center group" onClick={() => handleSetSlider(index)}>
                                {state.sliderCount === index ?
                                    <div className="w-10 h-3 rounded-full transition duration-700 bg-gradient-to-r from-adminGr0 to-adminText overflow-hidden">
                                        <div className="h-3 w-10 rounded-full transition duration-1000 bg-gradient-to-br from-txFirst100 to-txFirst0" style={{ transform: `translateX(-${100 - width}%)`}}></div>
                                    </div>
                                    :
                                    <div className="w-3 h-3 rounded-full transition duration-700  bg-light  group-hover:scale-125 cursor-pointer group-hover:bg-txFirst0" ></div>
                                }
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )

}