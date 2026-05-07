"use client"
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import LargeText from "@/components/text/LargeText";
import { MenuType } from "@/types/index";
import { useState } from "react";
import ButtonHeader from "@/components/button/ButtonHeader";
import MiddleText from "@/components/text/MiddleText";
import FadeInSection from "@/components/animation/FadeInSection";
import { GetUserMutation } from "@/gql/graphql";
import header from "@/variables/header/header";
import ThemeIcon from "./ThemeIcon";
import HeaderAuth from "./HeaderAuth";
import BurgerSection from "./BurgerSection";

interface Props {
    burgerMenu: MenuType[],
    user: GetUserMutation["getUser"] | false,
}

export default function BurgerMenu({ burgerMenu, user }: Props) {
    const mainId = useAppSelector((state) => state.position.value.section);
    const [showItem, setShowItem] = useState(false);
    return (
        <>
        <div className="lg:flex lg:items-center sm:hidden hidden lg:flex-row w-full sm:flex-row-reverse sm:justify-start flex-row-reverse justify-start sm:gap-4 gap-4">
            <nav className="w-full lg:block">
                <ul className="flex w-full justify-around gap-4">
                    {burgerMenu.filter((item) => item.name !== "").map((item, index) => (
                        <FadeInSection delay={(index + 1) * 500} key={item.name} animation={{ visible: "translateX(0)", hidden: "translateX(-100%)" }}>
                            <li  className="relative">
                                <Link href={item.href} ><MiddleText tailwind="transition duration-700 ease-in-out font-bold opacity-70 bg-gradient-to-r from-txSecond to-txSecond bg-clip-text text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:from-txFirst0 hover:to-txFirst100 hover:opacity-100 hover:scale-110">{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</MiddleText></Link>
                                <div className="absolute -bottom-1 h-[2.5px] gradient rounded-full left-0 w-0" style={{ transition: "width 0.3s ease-in-out", width: item.id === mainId ? "100%" : "0%" }}></div>
                            </li>
                        </FadeInSection>
                    ))}
                </ul>
            </nav>
                <HeaderAuth user={user} />
                <ThemeIcon key={header.keyIcons} />
            </div>

            <BurgerSection showItem={showItem} onClick={() => setShowItem((prev) => !prev)}>
                    <div className="w-full itmes-center justify-center flex">
                        <ThemeIcon key={header.keyIcons} />
                    </div>
                     <HeaderAuth user={user} />
                    <ul className="flex flex-col justify-between w-full h-full gap-4 items-center">
                        {burgerMenu.filter((item) => item.name !== "").map((item) => (
                            <li onClick={() => setShowItem((prev) => !prev)} key={`burger-menu-${item.name}`} className="w-full flex justify-center relative">
                                <FadeInSection animation={{ visible: "translateX(0)", hidden: "translateX(-50%)" }}>
                                    <Link href={item.href} ><LargeText tailwind="transition duration-700 ease-in-out font-bold bg-gradient-to-b from-txSecond to-txSecond bg-clip-text text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:from-txFirst0 hover:to-txFirst100 hover:opacity-100 hover:scale-110">{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</LargeText></Link>
                                    <div className="absolute -bottom-1 h-[4px] gradient rounded-full left-1/2 -translate-x-1/2 w-0" style={{ transition: "width 0.3s ease-in-out", width: item.id === mainId ? "30%" : "0%" }}></div>
                                </FadeInSection>
                            </li>
                        ))}
                    </ul>
            </BurgerSection>
        </>
    )
}