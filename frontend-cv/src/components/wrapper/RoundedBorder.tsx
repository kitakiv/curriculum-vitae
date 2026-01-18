export default function RoundedBorder({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <div className={`${tailwind} rounded-lg bg-white/2.5 border border-white/50`}>
            {children}
        </div>
    )
}