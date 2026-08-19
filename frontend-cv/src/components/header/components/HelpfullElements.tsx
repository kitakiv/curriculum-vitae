import { GetUserMutation } from "@/gql/graphql";
import header from "@/variables/header/header";
import ThemeIcon from "./ThemeIcon";
import HeaderAuth from "./HeaderAuth";

export default function HelpfullElemnts({ user }: { user: GetUserMutation["getUser"] | false}) {
    return (
        <>
        <div className="flex items-center justify-center"><span><ThemeIcon key={header.keyIcons} /></span></div>
        <HeaderAuth user={user} />
        </>
    )
}