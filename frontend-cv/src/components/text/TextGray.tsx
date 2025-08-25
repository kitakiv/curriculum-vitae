export default function TextGray({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <h4 className={`${tailwind} lg:text-lg md:text-md text-md text-wrap text-txSecond`}>{children}</h4>
    )
}