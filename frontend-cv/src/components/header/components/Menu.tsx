"use client"
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import LargeText from "@/components/text/LargeText";
import { MenuType } from "@/types/index";
import { useState } from "react";
import ButtonHeader from "@/components/button/ButtonHeader";
import MiddleText from "@/components/text/MiddleText";


export default function BurgerMenu({ burgerMenu }: { burgerMenu: MenuType[] }) {
    const mainId = useAppSelector((state) => state.position.value.section);
    const [showItem, setShowItem] = useState(false);
    return (
        <>
            <nav className="w-full lg:block sm:hidden hidden">
                <ul className="flex w-full justify-around gap-4">
                    {burgerMenu.filter((item) => item.name !== "").map((item) => (
                        <li key={item.name} className="relative">
                            <Link href={item.href} ><MiddleText tailwind="transition duration-700 ease-in-out font-bold opacity-70 bg-gradient-to-r from-txSecond to-txSecond bg-clip-text text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:from-txFirst0 hover:to-txFirst100 hover:opacity-100 hover:scale-110">{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</MiddleText></Link>
                            <div className="absolute -bottom-1 h-[2.5px] gradient rounded-full left-0 w-0" style={{ transition: "width 0.3s ease-in-out", width: item.id === mainId ? "100%" : "0%" }}></div>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="relative w-11 h-11 z-40 lg:hidden sm:block block" onClick={() => setShowItem((prev) => !prev)}>
                <ButtonHeader  tailwind="relative flex flex-col gap-[5px] z-50">
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ transform: showItem ? "rotate(65deg) translateY(9px) translateX(5px)" : "rotate(0deg) translateY(0%)", transition: "all 0.3s ease-in-out"}}></div>
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ opacity: showItem ? 0 : 1, transition: "all 0.3s ease-in-out"}}></div>
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ transform: showItem ? "rotate(-65deg) translateY(3px) translateX(8px)" : "rotate(0deg) translateY(0%)", transition: "all 0.3s ease-in-out"}}></div>
                </ButtonHeader>
                        <nav className="fixed top-0 right-0 w-screen h-screen padding backdrop-blur transition duration-700" style={{ transform: showItem ? "translateX(0)" : "translateX(100%)" }}>
                            <ul className="flex flex-col justify-between w-full h-full gap-4 items-center">
                                {burgerMenu.filter((item) => item.name !== "").map((item) => (
                                    <li key={`burger-menu-${item.name}`} className="w-full flex justify-center relative">
                                        <Link href={item.href} ><LargeText tailwind="transition duration-700 ease-in-out font-bold bg-gradient-to-b from-txSecond to-txSecond bg-clip-text text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:from-txFirst0 hover:to-txFirst100 hover:opacity-100 hover:scale-110">{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</LargeText></Link>
                                        <div className="absolute -bottom-1 h-[4px] gradient rounded-full left-1/2 -translate-x-1/2 w-0" style={{ transition: "width 0.3s ease-in-out", width: item.id === mainId ? "30%" : "0%" }}></div>
                                    </li>
                                ))}
                            </ul>
                        </nav>
            </div>
        </>
    )
}