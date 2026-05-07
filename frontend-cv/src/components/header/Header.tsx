
// import { getProfile } from "@/query/query";
import HeaderSection from "@/components/header/components/HeaderSection";
import header from "@/variables/header/header";
import menu from "@/variables/menu/menu";
import Link from "next/link";
import MainText from "@/components/text/MainText";
import BurgerMenu from "@/components/header/components/Menu";
import FadeInSection from "../animation/FadeInSection";
import { getProfileCached } from "@/query/profile.query";
import { GetProfileQuery, GetUserMutation } from "@/gql/graphql";
import ProfileSeciton from "@/components/header/components/ProfileSection";
export default async function Header({user}: {user: GetUserMutation["getUser"] | false}) {
    const profile: GetProfileQuery["profile"] = await getProfileCached();
    return (
        <header className=" w-full h-screen relative top-0 gradient-box overflow-hidden" id={header.id}>
            <HeaderSection>
                <FadeInSection delay={100} animation={{visible: "translateX(0)", hidden: "translateX(-50%)"}}>
                <Link href='/' className="lg:w-5/12 md:w-1/2 relative z-50">
                    <MainText>{profile.name + " " + profile.surname}</MainText>
                </Link>
                </FadeInSection>
                <BurgerMenu burgerMenu={menu.mainHeader} user={user} />
            </HeaderSection>
            <ProfileSeciton profile={profile}/>
        </header>
    );
}