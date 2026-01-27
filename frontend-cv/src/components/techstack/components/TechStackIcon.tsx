import MiddleText from "@/components/text/MiddleText";
import LiquidGlass from "@/components/wrapper/LiquidGlass";

export default function TechStackIcon({icon, name, tailwind}: {icon: string, name: string, tailwind?: string}) {
    return <LiquidGlass tailwindParent="rounded-lg techStack-card" hover shadow tint shine tailwind="flex flex-col items-center justify-center rounded-lg p-4 gap-4">
        <img src={icon} alt={name} className={`w-24 h-24 ${tailwind}`}></img>
        <MiddleText tailwind="text-firstTx100 font-bold">{name}</MiddleText>
    </LiquidGlass>
}