import HeaderLogin from "@/components/header/HeaderLogin";
import LoginPage from "@/components/login/login";
import StartPage from "@/components/header/components/StartPage";

export default async function Page() {

    return (
        <>
            <HeaderLogin />
            <main className="overflow-hidden w-full h-min-screen gradient-box relative">
                <StartPage tailwind="padding flex items-center justify-center">
                    <LoginPage />
                </StartPage>
            </main>
        </>
    );
}