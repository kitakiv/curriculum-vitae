import HeaderLogin from "@/components/header/HeaderLogin";
import StartPage from "@/components/header/components/StartPage";
import auth from "@/variables/auth/auth";
import ResetPassword from "@/components/admin/password/ResetPassowrd";
import ErrorMessage from "@/components/admin/components/ErrorMessage";
import { adminVariables } from "@/variables/admin/resource";

export type Props = {
  searchParams: Promise<{
    [auth.searchParamToken]?: string;
  }>
}

export default async function Page({searchParams}: Props) {

    const params = await searchParams;

    if (!params[auth.searchParamToken]) {
        return <ErrorMessage>{adminVariables.denied}</ErrorMessage>;
    }

    return (
        <>
            <HeaderLogin />
            <main className="overflow-hidden w-full h-screen gradient-box relative">
                <StartPage tailwind="padding mt-10 flex items-center justify-center">
                    <ResetPassword resetToken={params[auth.searchParamToken] || ""} />
                </StartPage>
            </main>
        </>
    );
}