import HeaderLogin from "@/components/header/HeaderLogin";
import StartPage from "@/components/header/components/StartPage";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import ProfileComponent from "@/components/profile/ProfileComponent";

export default async function Page() {
 const user: GetUserMutation['getUser'] | false = await getMe() as GetUserMutation['getUser'];
    return (
        <>
            <HeaderLogin />
            <main className="overflow-hidden w-full min-h-screen gradient-box relative">
                <StartPage tailwind="padding mt-10">
                    <ProfileComponent user={user} />
                </StartPage>
            </main>
        </>
    );
}