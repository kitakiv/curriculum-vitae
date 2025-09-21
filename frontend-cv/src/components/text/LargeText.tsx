export default function LargeText({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <h1 className={`${tailwind} lg:text-4xl md:text-3xl sm:text-2xl text-xl
        `}>{children}</h1>
    )
}