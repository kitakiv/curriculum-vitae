export default function SmallText({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <span className={`${tailwind} lg:text-md md:text-sm text-sm text-wrap`} >{children}</span>
    )
}