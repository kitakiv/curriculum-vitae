
export default function StartPage({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full lg:h-3/5 sm:h-2/4 h:2/4 sm:min-h-[350px] lg:min-h-[450px] min-h-[300px] position-relative overflow-hidden">
            {children}
        </div>
    );
}