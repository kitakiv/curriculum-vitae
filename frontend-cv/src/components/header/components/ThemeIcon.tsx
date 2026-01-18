'use client'
import theme from "@/variables/theme/theme";
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { changeTheme } from '@/features/theme/themeSlice'
import ButtonHeader from "@/components/button/ButtonHeader";
import Image from 'next/image'
import { useState } from "react";
import LiquidGlass from "@/components/wrapper/LiquidGlass";
export default function ThemeIcon() {
    const value = useAppSelector((state) => state.theme.value)
    const dispatch = useAppDispatch()
    const allTheme = Object.keys(theme)
    const [showTheme, setShowTheme] = useState(false);

    function showItems() {
        setShowTheme(!showTheme);
    }
    return (
       <div className="position-relative w-11 h-11 z-40" onClick={showItems}>
        {allTheme.filter((item) => item === value).map((item, index) => {
            return (
                <div key={`theme-list-key-${index}`}>
                <LiquidGlass rounded hover>
                <ButtonHeader key={`theme-button-${item}`}>
                    <Image className="group-hover:animate-spin" src={theme[item as keyof typeof theme].svg.path} alt="theme" width={20} height={20}/>
                </ButtonHeader>
                </LiquidGlass>
                {showTheme &&
                <div key={"theme-buttons"} className="transition-all position-absolute top-32 right-0">
                    <LiquidGlass rounded shadow>
                    {allTheme.filter(themeItem => themeItem !== value).map((themeItem) => {
                        console.log(`theme-button-${themeItem}`)
                    return (
                        <ButtonHeader tailwind="group" key={`theme-button-${themeItem}`} click={() => dispatch(changeTheme(themeItem))}>
                            <Image className="group-hover:animate-spin transition-all" src={theme[themeItem as keyof typeof theme].svg.path} alt="theme" width={20} height={20}/>
                        </ButtonHeader>
                        )
                    })}
                    </LiquidGlass>
                    </div>}
                </div>

            )
        })}
       </div>
    )
}