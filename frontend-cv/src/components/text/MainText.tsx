export default function MainText({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <h1 className={` ${tailwind?.includes("text-wrap") ? tailwind : `${tailwind} text-nowrap`} lg:text-2xl md:text-xl sm:text-xl text-lg bg-gradient-to-r from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-bold`}>{children}</h1>
    )
}