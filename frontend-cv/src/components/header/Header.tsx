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
import Image from "next/image";
import Link from "next/link";
import aboutme from "@/variables/aboutme/aboutme";
import MainText from "@/components/text/MainText";
import FadeInSection from "@/components/animation/FadeInSection";

export default async function Header() {
    // const profile = await getProfile();
    return (
        <header className="bg-gradient-to-br w-full h-screen from-bg100 via-bg33 to-bg0 bg-[length:200%_200%] animate-gradient-animate flex flex-col justify-around gap-4">
            <HeaderSection>
                <MainText>{header.name + " " + header.surname}</MainText>
                <ThemeIcon key={header.keyIcons} />
            </HeaderSection>
            <StartPage>
                <Rounds />
                <HeaderImage path={header.path} />
                <HeaderTitle textFirst={header.firstTitle} textSecond={header.secondTitle} />
            </StartPage >
            <div className="w-full flex flex-col items-center gap-4">
                <FadeInSection>
                    <HeaderSecondText text={header.text} />
                </FadeInSection>
                <Link href={`#${aboutme.id}`}>

                    <PinkButton tailwind="transition duration-700 group flex justify-between items-center gap-2 hover:shadow-lg hover:shadow-txSecond">
                        {header.button}
                        <Image src={header.arrow} alt="arrow" width={20} height={20} className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition duration-700"></Image>
                    </PinkButton>

                </Link>
            </div>
        </header>
    );
}