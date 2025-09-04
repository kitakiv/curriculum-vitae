"use client"
import { useAppSelector } from "@/store/hooks";
import menu from "@/variables/menu/menu";
import Link from "next/link";
import MiddleText from "@/components/text/MiddleText";

export default function BurgerMenu() {
    const mainId = useAppSelector((state) => state.position.value.section);
    return (
        <nav className="w-full">
        <ul className="flex w-full justify-around gap-4">
            {menu.menu.filter((item) => item.name !== "").map((item) => (
                <li key={item.name} className="relative">
                    <Link href={item.href} ><MiddleText tailwind="transition duration-700 ease-in-out font-bold opacity-70 bg-gradient-to-r from-txSecond to-txSecond bg-clip-text text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent hover:from-txFirst0 hover:to-txFirst100 hover:opacity-100 hover:scale-110">{item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}</MiddleText></Link>
                    <div className="absolute -bottom-1 h-[2.5px] gradient rounded-full left-0 w-0" style={{transition: "width 0.3s ease-in-out", width: item.id === mainId ? "100%" : "0%" }}></div>
                </li>
            ))}
        </ul>
        </nav>
    )
}