'use client'
import { useAppSelector } from "@/store/hooks"


export default function HeaderSection({children}: {children: React.ReactNode}) {
    const show = useAppSelector((state) => state.position.value)
    return (
        <div className="fixed transition duration-700 z-50 w-full top-0 flex items-center bg-transparent justify-between lg:h-16 md:h-16 sm:h-14 h-14 lg:p-6 p-2 hover:bg100" style={{backgroundColor: show ? "var(--color-bg-100)" : "transparent"}}>
            {children}
        </div>
    )
}