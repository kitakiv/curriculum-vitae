export default function TextWhite({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <span className={`${tailwind} text-wrap w-2/3 lg:text-4xl md:text-3xl sm:text-xl text-lg text-light font-bold`}>{children}</span>
    )
}