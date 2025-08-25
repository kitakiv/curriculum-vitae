export default function MainText({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <h1 className={` ${tailwind} lg:text-2xl md:text-xl sm:text-xl bg-gradient-to-r from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-bold`}>{children}</h1>
    )
}