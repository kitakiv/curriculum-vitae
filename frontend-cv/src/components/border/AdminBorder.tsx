export default function AdminBorder({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <div className={`${tailwind} border border-adminTx100 rounded-md bg-adminGr33 drop-shadow-2xl shadow-adminTx`}>{children}</div>
    )
}