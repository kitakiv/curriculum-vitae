export default function ButtonHeader({children, click, tailwind}: {children: React.ReactNode, click?: () => void, tailwind?: string}) {
    return (
        <button onClick={click} className={`transition-all group flex justify-center items-center w-11 h-11 ${tailwind}`}>
            {children}
        </button>
    )
}