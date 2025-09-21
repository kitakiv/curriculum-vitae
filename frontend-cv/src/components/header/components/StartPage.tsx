
export default function StartPage({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full lg:h-3/4 sm:h-2/4 h:2/4 sm:min-h-[500px] lg:min-h-[450px] min-h-[370px] relative overflow-hidden">
            {children}
        </div>
    );
}