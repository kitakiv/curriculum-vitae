

export default function TechBlock({ children, click, tailwind, active = false }: { children: React.ReactNode, click?: () => void, tailwind?: string, active?: boolean }) {
    const colors = ["gradient-round-two", "gradient-round-three", "gradient-round"];
    const colorRound = colors[Math.floor(Math.random() * colors.length)];
    return (
        <button
            onClick={click}
            className={ `${active ? colorRound :  `hover:${colorRound}` } ${tailwind}  flex justify-center items-center w-auto h-auto px-2 py-1 rounded-full bg-opacity-80 ease-in-out shadow-bg100 shadow-lg transition-all  duration-700 hover:scale-105`}>
          {children}
        </button>
    )
}