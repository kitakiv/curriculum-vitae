
// import { getProfile } from "@/query/query";
import StartPage from "@/components/header/components/StartPage";
import HeaderSection from "@/components/header/components/HeaderSection";
import ThemeIcon from "@/components/header/components/ThemeIcon";
import HeaderTitle from "@/components/header/components/HeaderTitle";
import header from "@/variables/header/header";
import HeaderImage from "@/components/header/components/HeaderImage";
import HeaderSecondText from "@/components/header/components/HeaderSecondText";
import PinkButton from "@/components/button/PinkButton";
import Image from "next/image";
import menu from "@/variables/menu/menu";
import Link from "next/link";
import aboutme from "@/variables/aboutme/aboutme";
import MainText from "@/components/text/MainText";
import BurgerMenu from "@/components/header/components/Menu";
import FadeInSection from "../animation/FadeInSection";
import HeaderModel from "./components/HeaderModel";
import { getProfileCached } from "@/query/profile.query";
import { GetProfileQuery, GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
export default async function Header() {
    const user: GetUserMutation['getUser'] | false = await getMe()
    const profile: GetProfileQuery["profile"] = await getProfileCached();
    return (
        <header className=" w-full h-screen relative top-0 gradient-box overflow-hidden" id={header.id}>
            <HeaderSection>
                <FadeInSection delay={100} animation={{visible: "translateX(0)", hidden: "translateX(-50%)"}}>
                <Link href='/' className="lg:w-5/12 md:w-1/2 relative z-50">
                    <MainText>{profile.name + " " + profile.surname}</MainText>
                </Link>
                </FadeInSection>
                <div className="flex lg:items-center lg:flex-row w-full sm:flex-row-reverse sm:justify-start flex-row-reverse justify-start sm:gap-4 gap-4">
                {user && <Link href='/admin' className="relative z-50"><PinkButton tailwind="text-sm px-4 py-2">Admin page</PinkButton></Link>}
                {!user && <Link href='/login' className="relative z-50"><PinkButton tailwind="text-sm px-4 py-2">Login</PinkButton></Link>}
                <BurgerMenu burgerMenu={menu.mainHeader} />
                <ThemeIcon key={header.keyIcons} />
                </div>
            </HeaderSection>
            <StartPage tailwind="grid grid-cols-12 grid-flow-col grid-rows-12">
                <HeaderModel />
                <HeaderImage images={profile.profilePhotos || []} />
                <HeaderTitle textFirst={header.firstTitle} textSecond={header.secondTitle} />
                <HeaderSecondText text={profile.typingText} />
                <Link href={`#${aboutme.id}`} className=" col-span-12 col-start-1 col-end-13 row-span-2 row-start-11 row-end-13 flex justify-center items-center">
                    <PinkButton tailwind=" relative z-40 transition duration-700 group flex justify-between items-center gap-2 hover:shadow-lg hover:shadow-txSecond">
                        {header.button}
                        <Image src={header.arrow} alt="arrow" width={20} height={20} className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition duration-700"></Image>
                    </PinkButton>
                </Link>
            </StartPage >
        </header>
    );
}