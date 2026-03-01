export default function PinkButton({children, tailwind, click, type, disabled=false}: {children: React.ReactNode, click?: () => void, tailwind?: string, type?: "button" | "submit" | "reset" | undefined, disabled?: boolean}) {
    return (
        <button type={type || "button"} disabled={disabled} onClick={click} className={`${tailwind} flex justify-center items-center w-auto h-auto px-8 py-3 rounded-full bg-gradient-to-r from-txFirst0 to-txFirst100 transition duration-700 bg-opacity-80 ease-in-out text-light shadow-bg100 shadow-lg hover:bg-opacity-100`}>
            {children}
        </button>
    )
}