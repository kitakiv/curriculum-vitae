
"use client"
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { changePosition, changeSection } from "@/features/position/PositionSlice";
import menu from "@/variables/menu/menu";


export default function PositionWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const sectionsIds = menu.menu.map((item) => item.id);
    let previousScrollPosition = window.scrollY || 0;
    const offset = 150;

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleSection);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("scroll", handleSection);
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

    const handleSection  = (event: Event) => {
       sectionsIds.forEach((id) => {
        const element = document.getElementById(id);
        const elementHeight = element?.offsetHeight || 0;
        const elementTop = (element?.offsetTop || offset) - offset   || 0;
        if (window.scrollY > elementTop && window.scrollY < elementTop + elementHeight) {
            dispatch(changeSection(id));
        }
       })
    }
    return <>
        {children}
    </>
}