'use client'
import theme from "@/variables/theme/theme";
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { changeTheme } from '@/features/theme/themeSlice'
import ButtonHeader from "@/components/button/ButtonHeader";
import Image from 'next/image'
import { useState } from "react";
import LiquidGlass from "@/components/wrapper/LiquidGlass";
import { LOCAL_STORAGE_THEME_KEY } from "@/features/theme/themeSlice";
export default function ThemeIcon() {
    const value = useAppSelector((state) => state.theme.value)
    const dispatch = useAppDispatch()
    const allTheme = Object.keys(theme)
    const [animate, setAnimate] = useState(false);

    const trigger = () => {
        setAnimate(true);

        setTimeout(() => {
            setAnimate(false);
        }, 600);
    };

    function changeItem(themeItem: string): void {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, themeItem);
        dispatch(changeTheme(themeItem));
        trigger();
    };
    const lenght = allTheme.length * 44;
    return (

        <div className="liquidGlass-elem rounded-full flex flex-row relative"  style={{ width: `${lenght}px` }}>
            <div className="w-11 h-11 border-[1px] border-light rounded-full absolute liquidGlass-transition transition-transform duration-700 ease-in-out" style={{ transform: `translateX(${theme[value as keyof typeof theme].index * 44}px) scale(${animate ? 1.10 : 1})` }}>
                <LiquidGlass rounded tailwindParent="w-full h-full" shine shadow={animate} width tailwind="flex items-center justify-center"></LiquidGlass>
            </div>
            <LiquidGlass rounded tailwindParent="w-full h-full" shine shadow={animate} width tailwind="flex items-center justify-center">
            {allTheme.map((themeItem) => {
                if (themeItem === value) {
                    return <ButtonHeader tailwind="group rounded-full transition-all duration-700" key={`theme-button-${themeItem}`} click={() => changeItem(themeItem)}>
                        <Image src={theme[themeItem as keyof typeof theme].svg.path} alt="theme" width={20} height={20} />
                    </ButtonHeader>
                }
                return (
                    <ButtonHeader tailwind="group" key={`theme-button-${themeItem}`} click={() => changeItem(themeItem)}>
                        <Image className="group-hover:animate-spin transition-all" src={theme[themeItem as keyof typeof theme].svg.path} alt="theme" width={20} height={20} />
                    </ButtonHeader>
                )
            })}
            </LiquidGlass>
        </div>
    )
}