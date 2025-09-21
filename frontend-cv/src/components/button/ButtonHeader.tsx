export default function ButtonHeader({children, click, tailwind}: {children: React.ReactNode, click?: () => void, tailwind?: string}) {
    return (
        <button onClick={click} className={`transition-all group flex justify-center items-center w-11 h-11 border-2 border-light rounded-md bg-white/30 hover:bg-white/70 hover:border-transparent ${tailwind}`}>
            {children}
        </button>
    )
}