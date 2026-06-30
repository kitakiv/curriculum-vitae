
import SmallText from "@/components/text/SmallText";
import LiquidGlass from "@/components/wrapper/LiquidGlass";
import { TechStack } from "@/gql/graphql";

export default function TechStackIcon({techStack}: {techStack: TechStack}) {
    return <LiquidGlass tailwindParent="rounded-lg techStack-card w-full" hover shadow tint shine tailwind="flex flex-col items-center w-full justify-center rounded-lg p-4 gap-4">
        <img src={techStack.techSvg} alt={techStack.techName} className={`w-24 h-24`}></img>
        <SmallText tailwind="text-adminTx font-bold">{techStack.techName}</SmallText>
    </LiquidGlass>
}