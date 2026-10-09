import SmallText from "../text/SmallText"

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
    tailwind?: string
    type?: "button" | "submit" | "reset" | undefined,
    disabled?: boolean,
    pending?: boolean
};

export default function LiquidGlassButton({children, tailwind, type, disabled, pending, ...props}: Props) {
    return (

        <button className={`group border-[1px] border-light hover:border-zOpacity liquidGlass-elem padding-button rounded-full hover:gradient-round-two transition-all duration-700  ${tailwind}`} type={type} disabled={disabled} {...props}>
            <SmallText tailwind="flex font-extrabold text-txSecond extra-bold group-hover:text-light text-nowrap ">{children}</SmallText>
        </button>
    )
}