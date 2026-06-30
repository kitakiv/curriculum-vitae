import MiddleText from "../text/MiddleText";

export default function SkillButton({ children, click, tailwind, active = false }: { children: React.ReactNode, click?: () => void, tailwind?: string, active?: boolean }) {
    const colors = ["gradient-round-two", "gradient-round-three", "gradient-round-one"];
    const colorRound = colors[Math.floor(Math.random() * colors.length)];
    return (
        <button
            onClick={active ? undefined : click}
            className={ `${active ? `${colorRound} cursor-auto` :  `hover:scale-105 cursor-pointer hover:bg-gradient-to-r hover:from-rn0 hover:to-textFirst0 transition-all duration-700` } ${tailwind}  flex justify-center items-center w-auto h-auto px-8 py-3 rounded-full bg-opacity-80 ease-in-out shadow-bg100 shadow-lg`}>
            <MiddleText tailwind={active ? "text-light" : "text-adminTx"}>{children}</MiddleText>
        </button>
    )
}