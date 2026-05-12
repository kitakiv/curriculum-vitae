import HeaderSection from "./components/HeaderSection"
import ThemeIcon from "@/components/header/components/ThemeIcon"
import header from "@/variables/header/header"
import MainLink from "@/components/header/components/MainLink";

export default function HeaderLogin() {
     const profile: GetProfileQuery["profile"] = await getProfileCached();
    return (
        <HeaderSection>
                <MainLink profile={profile} href="/"/>
                <ThemeIcon key={header.keyIcons} />
        </HeaderSection>
    )
}