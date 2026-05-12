import { GetUserMutation } from "@/gql/graphql";
import header from "@/variables/header/header";
import ThemeIcon from "./ThemeIcon";
import HeaderAuth from "./HeaderAuth";

export default function HelpfullElemnts({ user }: { user: GetUserMutation["getUser"] | false}) {
    return (
        <>
        <ThemeIcon key={header.keyIcons} />
        <HeaderAuth user={user} />
        </>
    )
}