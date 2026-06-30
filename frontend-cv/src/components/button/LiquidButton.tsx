import SmallText from "../text/SmallText"

export default function LiquidGlassButton({children, type = "button", tailwind}: {children: React.ReactNode, type?: "button" | "submit" | "reset", tailwind?: string}) {
    return (

        <button className={`group border-[1px] border-light hover:border-zOpacity liquidGlass-elem padding-button rounded-full hover:gradient-round-two transition-all duration-700  ${tailwind}`} type={type}>
            <SmallText tailwind="flex font-extrabold text-txSecond extra-bold group-hover:text-light text-nowrap ">{children}</SmallText>
        </button>
    )
}