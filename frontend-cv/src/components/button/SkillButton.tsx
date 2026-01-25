import MiddleText from "../text/MiddleText";

export default function SkillButton({ children, click, tailwind, active = false }: { children: React.ReactNode, click?: () => void, tailwind?: string, active?: boolean }) {
    const colors = ["gradient-round-two", "gradient-round-three", "gradient-round"];
    const colorRound = colors[Math.floor(Math.random() * colors.length)];
    return (
        <button
            onClick={click}
            className={`${active ? colorRound : "bg-adminGr0"} flex justify-center items-center w-auto h-auto px-8 py-3 rounded-full bg-opacity-80 ease-in-out shadow-bg100 shadow-lg hover:scale-105 transition duration-700 ${tailwind}"}`}>
            <MiddleText tailwind={active ? "text-light" : "text-adminTx"}>{children}</MiddleText>
        </button>
    )
}