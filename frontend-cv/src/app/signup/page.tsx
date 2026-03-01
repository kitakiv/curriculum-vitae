import HeaderLogin from "@/components/header/HeaderLogin";
import SignUpPage from "@/components/singup/singup"
import StartPage from "@/components/header/components/StartPage";

export default function AdminForm() {
    return (
        <>
        <HeaderLogin/>
        <main  className="overflow-hidden w-full h-screen gradient-box relative">
            <StartPage tailwind="padding flex items-center justify-center">
            <SignUpPage/>
            </StartPage>
        </main>
        </>
    );
}