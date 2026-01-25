import experiences from "@/variables/experience/experience";

export default function ProgressRounds({ colorRound, tailwind }: { colorRound: string, tailwind?: string }) {
    return (
        <div className={` ${tailwind} absolute z-10 -left-[17.6%] -translate-x-[50%] top-0 h-16 w-16 rounded-full ${colorRound} flex justify-center items-center`}>
            <img src={experiences.doneSvg} alt={experiences.name} className={`w-2/3 h-2/3 rounded-full`}></img>
        </div>
    )
}