
export default function StartPage({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full h-full overflow-hidden grid grid-cols-12 grid-flow-col grid-rows-12">
            {children}
        </div>
    );
}