import HeaderLogin from "@/components/header/HeaderLogin";
import LoginPage from "@/components/login/login";

export default function AdminForm() {
    return (
        <>
        <HeaderLogin/>
        <main  className="w-full h-screen gradient-box relative flex flex-col items-center justify-center">
            <LoginPage/>
        </main>
        </>
    );
}