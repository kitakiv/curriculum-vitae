export default function TextGray({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <h4 className={`${tailwind} lg:text-xl md:text-lg text-md w-2/3 text-wrap text-center text-txSecond`}>{children}</h4>
    )
}