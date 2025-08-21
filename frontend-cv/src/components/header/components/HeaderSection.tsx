
export default function HeaderSection({children}: {children: React.ReactNode}) {
    return (
        <div className="top-0 bg-transparent flex items-center justify-between lg:h-16 md:h-16 sm:h-14 h-14 lg:p-6 p-2">
            <h1 className="lg:text-2xl md:text-xl sm:text-xl bg-gradient-to-r from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-bold">{`Name Surname`}</h1>
            {children}
        </div>
    )
}