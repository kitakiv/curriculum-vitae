export default function TextBlack({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <span className={`${tailwind} text-wrap w-2/3 lg:text-xl md:text-lg sm:text-md text-sm text-black`}>{children}</span>
    )
}