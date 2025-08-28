'use client'
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { changePosition } from "@/features/position/PositionSlice";


export default function HeaderSection({children}: {children: React.ReactNode}) {
    const show = useAppSelector((state) => state.position.value);
    const dispatch = useAppDispatch();

    function showItems(value: boolean) {
        dispatch(changePosition(value));
    }

    return (
        <div className="fixed transition duration-700 z-50 w-full top-0 flex items-center bg-transparent justify-between  lg:p-3 p-2 hover:bg100" onMouseEnter={() => showItems(true)} onMouseLeave={() => showItems(false)} style={{backgroundColor: show ? "var(--color-bg-33)" : "transparent"}}>
            {children}
        </div>
    )
}