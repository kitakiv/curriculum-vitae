export default function TextHeading({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <h2 className={`${tailwind} lg:text-5xl md:text-4xl sm:text-3xl text-2xl bg-gradient-to-br from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-bold `}>{children}</h2>
    )
}