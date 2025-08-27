
"use client"
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { changePosition } from "@/features/position/PositionSlice";

export default function PositionWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    let previousScrollPosition = window.scrollY;

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = (event: Event) => {
        if (window.scrollY < 10) {
            dispatch(changePosition(false));
        } else {
            if (window.scrollY > previousScrollPosition) {
                dispatch(changePosition(false));
            } else {
                dispatch(changePosition(true));
            }
        }
        previousScrollPosition = window.scrollY;
	};
    return <>
        {children}
    </>
}