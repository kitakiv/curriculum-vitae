'use client';
import Link from "next/link";
import LargeText from "@/components/text/LargeText";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleBurgerMenu } from "@/features/position/PositionSlice";
import FadeInSection from "@/components/animation/FadeInSection";
import { MenuType } from "@/types/index";


interface Props {
    children: React.ReactNode
    list: MenuType[]
}

export default function BurgerMenu({list, children}: Props) {
    const mainId = useAppSelector((state) => state.position.value.section);
    const burger = useAppSelector((state) => state.position.value.burgerMenu);
    const dispatch = useAppDispatch();
    return (
                <nav className="fixed z-40 itmes-center flex flex-col gap-4 top-0 right-0 w-screen h-screen overflow-y-scroll pb-20 liquid-glass-burger pt-20 px-4 transition duration-700 " style={{ transform: burger ? "translateX(0)" : "translateX(100%)" }}>
                    <div className="py-4 gap-4  itmes-center justify-center flex flex-col">
                        {children}
                    </div>

                    <ul className="flex flex-col justify-between w-full h-full gap-4 items-center">
                        {list.filter((item) => item.name !== "").map((item) => (
                            <li onClick={() => dispatch(toggleBurgerMenu())} key={`burger-menu-${item.name}`} className="w-full flex justify-center relative">
                                <FadeInSection resetOnExit={!burger} animation={{ visible: "translateX(0)", hidden: "translateX(-50%)" }}>
                                    <Link href={item.href} ><LargeText tailwind="transition duration-700 ease-in-out font-bold bg-gradient-to-b from-txSecond to-txSecond bg-clip-text text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:from-txFirst0 hover:to-txFirst100 hover:opacity-100 hover:scale-110">{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</LargeText></Link>
                                    <div className="absolute -bottom-1 h-[4px] gradient rounded-full left-1/2 -translate-x-1/2 w-0" style={{ transition: "width 0.3s ease-in-out", width: item.id === mainId ? "30%" : "0%" }}></div>
                                </FadeInSection>
                            </li>
                        ))}
                    </ul>
                </nav>
            )
}