import { getProfile } from "@/query/query";
import StartPage from "@/components/header/components/StartPage";
import HeaderSection from "@/components/header/components/HeaderSection";
import ThemeIcon from "@/components/header/components/ThemeIcon";
import Rounds from "@/components/header/components/Rounds";
import HeaderTitle from "@/components/header/components/HeaderTitle";
import header from "@/variables/header/header";
import HeaderImage from "@/components/header/components/HeaderImage";
import HeaderSecondText from "@/components/header/components/HeaderSecondText";
import PinkButton from "@/components/button/PinkButton";

export default async function Header() {
    // const profile = await getProfile();
    return (
        <header className="bg-gradient-to-br w-full h-screen from-bg100 via-bg33 to-bg0 bg-[length:200%_200%] animate-gradient-animate">
        <HeaderSection>
            <ThemeIcon key={header.keyIcons}/>
        </HeaderSection>
        <StartPage>
            <Rounds />
            <HeaderTitle textFirst={header.firstTitle} textSecond={header.secondTitle} />
            <HeaderImage path={header.path} />
            <HeaderSecondText text={header.text} />
            <PinkButton tailwind="absolute lg:bottom-10 sm:bottom-14 bottom-20 left-1/2 -translate-x-1/2">{header.button}</PinkButton>
        </StartPage >
       </header>
    );
}