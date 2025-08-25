
export default function HeaderSection({children}: {children: React.ReactNode}) {
    return (
        <div className="top-0 bg-transparent flex items-center justify-between lg:h-16 md:h-16 sm:h-14 h-14 lg:p-6 p-2">
            {children}
        </div>
    )
}