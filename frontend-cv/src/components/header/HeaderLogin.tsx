import HeaderSection from "./components/HeaderSection"
import ThemeIcon from "@/components/header/components/ThemeIcon"
import header from "@/variables/header/header"
import MainLink from "@/components/header/components/MainLink";
import { GetProfileQuery } from "@/gql/graphql";  
import { getProfileCached } from "@/query/profile.query";

export default async function HeaderLogin() {
     const profile: GetProfileQuery["profile"] = await getProfileCached();
    return (
        <HeaderSection>
                <MainLink profile={profile} href="/"/>
                <ThemeIcon key={header.keyIcons} />
        </HeaderSection>
    )
}