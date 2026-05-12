"use client"
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { MenuType } from "@/types/index";
import MiddleText from "@/components/text/MiddleText";
import FadeInSection from "@/components/animation/FadeInSection";



interface Props {
    burgerMenu: MenuType[],
    children?: React.ReactNode
}

export default function BurgerMenu({ burgerMenu, children }: Props) {
    const mainId = useAppSelector((state) => state.position.value.section);
    return (
        <>
            <div className="lg:flex lg:items-center sm:hidden hidden lg:flex-row w-full sm:flex-row-reverse sm:justify-start flex-row-reverse justify-start sm:gap-4 gap-4">
                <nav className="w-full lg:block">
                    <ul className="flex w-full justify-around gap-4">
                        {burgerMenu.filter((item) => item.name !== "").map((item, index) => (
                            <FadeInSection delay={(index + 1) * 500} key={item.name} animation={{ visible: "translateX(0)", hidden: "translateX(-100%)" }}>
                                <li className="relative">
                                    <Link href={item.href} ><MiddleText tailwind="transition duration-700 ease-in-out font-bold opacity-70 bg-gradient-to-r from-txSecond to-txSecond bg-clip-text text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:from-txFirst0 hover:to-txFirst100 hover:opacity-100 hover:scale-110">{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</MiddleText></Link>
                                    <div className="absolute -bottom-1 h-[2.5px] gradient rounded-full left-0 w-0" style={{ transition: "width 0.3s ease-in-out", width: item.id === mainId ? "100%" : "0%" }}></div>
                                </li>
                            </FadeInSection>
                        ))}
                    </ul>
                </nav>
               {
                children
               }
            </div>
        </>
    )
}