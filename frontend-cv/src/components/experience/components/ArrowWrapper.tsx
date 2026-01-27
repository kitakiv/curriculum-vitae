import experiences from "@/variables/experience/experience";

export default function ArrowWrapper({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <div className={`${tailwind} relative`} >
            <div className="flex items-center z-10 justify-center absolute top-0 right-0 translate-x-[50%] -translate-y-[20%] w-16 h-16 liquidGlass-elem liquidGlass-shadow rounded-full">
                <img src={experiences.arrowSvg} alt="verified" className="w-2/3 h-2/3 z-20"/>
            </div>
            {children}
        </div>
    )
}