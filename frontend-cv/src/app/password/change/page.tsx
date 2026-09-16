import HeaderLogin from "@/components/header/HeaderLogin";
import ChangePassword from "@/components/admin/password/ChangePassword";
import StartPage from "@/components/header/components/StartPage";

export default async function Page() {

    return (
        <>
            <HeaderLogin />
            <main className="overflow-hidden w-full h-screen gradient-box relative">
                <StartPage tailwind="padding mt-10 flex items-center justify-center">
                    <ChangePassword />
                </StartPage>
            </main>
        </>
    );
}