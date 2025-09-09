export default function AdminButton({children, click, tailwind, type}: {children: React.ReactNode, click?: () => void, tailwind?: string, type?: "button" | "submit" | "reset" | undefined}) {
    return (
        <button type={type || "button"} onClick={click} className={`transition-all group flex justify-center items-center rounded-md bg-adminGr0 hover:bg-adminGr100 hover:shadow-md hover:scale-105  text-adminTx px-5 py-3 ${tailwind}`}>
            {children}
        </button>
    )
}