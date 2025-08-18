import ThemeIcon from "@/components/header/components/ThemeIcon";
import { getProfile } from "@/query/query";
import StartPage from "@/components/header/components/StartPage";

export default async function Header() {
    // const profile = await getProfile();
    return (
        <header className="bg-gradient-to-br w-full h-screen from-bg100 via-bg33 to-bg0 bg-[length:200%_200%] animate-gradient-animate">
        <div className="top-0 bg-transparent flex items-center justify-between lg:h-17 md:h-14 sm:h-12 lg:p-6 md:p-4 sm:p-2">
            <h1 className="lg:text-2xl md:text-xl sm:text-xl bg-gradient-to-r from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-bold">{`Name Surname`}</h1>
            <ThemeIcon />
        </div>
        <StartPage />
       </header>
    );
}