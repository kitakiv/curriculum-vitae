
import SmallText from "@/components/text/SmallText";
import LiquidGlass from "@/components/wrapper/LiquidGlass";

export default function TechStackIcon({icon, name, tailwind}: {icon: string, name: string, tailwind?: string}) {
    return <LiquidGlass tailwindParent="rounded-lg techStack-card w-full" hover shadow tint shine tailwind="flex flex-col items-center w-full justify-center rounded-lg p-4 gap-4">
        <img src={icon} alt={name} className={`w-24 h-24 ${tailwind}`}></img>
        <SmallText tailwind="text-adminTx font-bold">{name}</SmallText>
    </LiquidGlass>
}