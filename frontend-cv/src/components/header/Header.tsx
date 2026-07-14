
// import { getProfile } from "@/query/query";
import HeaderSection from "@/components/header/components/HeaderSection";
import header from "@/variables/header/header";
import menu from "@/variables/menu/menu";
import Menu from "@/components/header/components/Menu";
import { getProfileCached } from "@/query/profile.query";
import { GetProfileQuery, GetUserMutation } from "@/gql/graphql";
import ProfileSeciton from "@/components/header/components/ProfileSection";
import StartPage from "@/components/header/components/StartPage";
import BurgerMenu from "./components/BurgerMenu";
import BurgerIcon from "./components/BurgerIcon";
import HelpfullElements from "./components/HelpfullElements";
import MainLink from "./components/MainLink";
export default async function Header({ user }: { user: GetUserMutation["getUser"] | false }) {
    const profile: GetProfileQuery["profile"] = await getProfileCached();
    return (
            <header id={header.id}>

                <StartPage tailwind="w-full h-screen relative top-0 gradient-box overflow-hidden grid grid-cols-12 grid-flow-col grid-rows-12">
                <HeaderSection>
                    {/* the name of the page */}
                    <MainLink href="/" profile={profile} />
                    {/* menu on big screens */}
                    {/* @ts-ignore */}
                    <Menu burgerMenu={menu.mainHeader} user={user} >
                        <HelpfullElements user={user}/>
                    </Menu>
                    {/* burger menu icon when screen is small */}
                    <BurgerIcon/>
                </HeaderSection>
                {/* profile section */}
                <ProfileSeciton profile={profile} />
               </StartPage>
               {/* opened burger menu */}
               {/* @ts-ignore */}
               <BurgerMenu user={user} list={menu.mainHeader}>
                   {/* theme icon and auth */}
                    <HelpfullElements user={user}/>
               </BurgerMenu> 
            </header>
    );
}