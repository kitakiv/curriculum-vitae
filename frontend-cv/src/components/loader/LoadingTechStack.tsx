import SmallText from "../text/SmallText";
import LiquidGlass from "../wrapper/LiquidGlass";
import { Skeleton } from "@mui/material";

function LoadingTechStack() {
    return <LiquidGlass tailwindParent="rounded-lg techStack-card w-full" hover shadow tint shine tailwind="flex flex-col items-center w-full justify-center rounded-lg p-4 gap-4">
        <Skeleton variant="circular" width={96} height={96} />
        <Skeleton variant="text" width={100} height={20} />
    </LiquidGlass>
}

export default function LoadingTechStacks({ length = 3 }: { length?: number }) {
    return Array.from({ length }).map((_, index) => <LoadingTechStack key={`loadingTechStack-${index}-card`} />)
}




