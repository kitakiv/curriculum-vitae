
export default function StartPage({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full h-full position-relative overflow-hidden">
            {children}
        </div>
    );
}