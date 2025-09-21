export default function FollowButton({children, click, tailwind}: {children: React.ReactNode, click?: () => void, tailwind?: string}) {
    return (
        <button onClick={click} className={`transition-all group flex justify-center items-center lg:px-5 w-full md:px-5 sm:px-5 px-4 lg:py-3 md:py-3 sm:py-3 py-3  rounded-md bg-white/30 hover:bg-white/70 hover:border-transparent ${tailwind}`}>
            {children}
        </button>
    )
}