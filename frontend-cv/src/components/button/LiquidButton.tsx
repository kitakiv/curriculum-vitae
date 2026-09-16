import SmallText from "../text/SmallText"

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
    tailwind?: string
};

export default function LiquidGlassButton({children, tailwind, ...props}: Props) {
    return (

        <button className={`group border-[1px] border-light hover:border-zOpacity liquidGlass-elem padding-button rounded-full hover:gradient-round-two transition-all duration-700  ${tailwind}`} {...props}>
            <SmallText tailwind="flex font-extrabold text-txSecond extra-bold group-hover:text-light text-nowrap ">{children}</SmallText>
        </button>
    )
}