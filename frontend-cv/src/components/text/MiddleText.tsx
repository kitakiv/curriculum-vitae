export default function MiddleText({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <h2 className={`${tailwind} lg:text-xl md:text-2md sm:text-md text-md`}>{children}</h2>
    )
}