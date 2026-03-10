
interface AdminButtonProps {
    children: React.ReactNode,
    click?: () => void,
    tailwind?: string,
    type?: "button" | "submit" | "reset" | undefined,
    disabled?: boolean,
    pending?: boolean
}
export default function AdminButton({children, click, tailwind, type, disabled = false, pending = false}: AdminButtonProps) {
    return (
        <button type={type || "button"} disabled={disabled} onClick={click} className={`${disabled || pending ? "opacity-50 cursor-not-allowed" : "hover:bg-adminGr100 hover:shadow-md hover:shadow-txSecond"} transition-all duration-700 group flex justify-center items-center rounded-md bg-adminGr0  text-adminTx px-5 py-3 ${tailwind}`}>
            {children}
        </button>
    )
}