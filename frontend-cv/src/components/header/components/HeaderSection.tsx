'use client'
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { changePosition } from "@/features/position/PositionSlice";
import LiquidGlass from "@/components/wrapper/LiquidGlass";
import FadeInSection from "@/components/animation/FadeInSection";


export default function HeaderSection({ children }: { children: React.ReactNode }) {
    const show = useAppSelector((state) => state.position.value.position);
    const dispatch = useAppDispatch();

    function showItems(value: boolean) {
        dispatch(changePosition(value));
    }

    return (
        <div className="fixed transition duration-700 z-50 w-full top-0 flex items-center bg-transparent justify-between  lg:p-3 p-2 hover:bg100 gap-4" onMouseEnter={() => showItems(true)} onMouseLeave={() => showItems(false)}>
                <LiquidGlass tailwind="w-full flex items-center justify-between p-3" shadow={show} rounded={show}>
                {children}
                </LiquidGlass>
        </div >
    )
}