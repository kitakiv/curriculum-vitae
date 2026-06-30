'use client';
import ButtonHeader from "@/components/button/ButtonHeader";
import LiquidGlass from "@/components/wrapper/LiquidGlass";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleBurgerMenu } from "@/features/position/PositionSlice";
export default function BurgerIcon() {
    const dispatch = useAppDispatch();
    const burgerOpen = useAppSelector((state) => state.position.value.burgrMenu);
    return <>
    <div className="relative w-11 h-11 z-50 lg:hidden sm:block block">
            <div className="relative w-11 h-11 z-40 lg:hidden sm:block block" onClick={() => dispatch(toggleBurgerMenu())} >
                <ButtonHeader tailwind="flex flex-col gap-[5px] rounded-full">
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ transform: burgerOpen ? "rotate(65deg) translateY(9px) translateX(5px)" : "rotate(0deg) translateY(0%)", transition: "all 0.3s ease-in-out" }}></div>
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ opacity: burgerOpen ? 0 : 1, transition: "all 0.3s ease-in-out" }}></div>
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ transform: burgerOpen ? "rotate(-65deg) translateY(3px) translateX(8px)" : "rotate(0deg) translateY(0%)", transition: "all 0.3s ease-in-out" }}></div>
                </ButtonHeader>
            </div>
    </div>
    </>

}