// import { getProfile } from "@/query/query";
import StartPage from "@/components/header/components/StartPage";
import HeaderSection from "@/components/header/components/HeaderSection";
import ThemeIcon from "@/components/header/components/ThemeIcon";
import Rounds from "@/components/animation/Rounds";
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
export default async function Header() {
    // const profile = await getProfile();
    return (
        <header className=" w-full h-screen gradient-box flex flex-col justify-around gap-4" id={header.id}>
            <HeaderSection>
                <Link href='/' className="lg:w-5/12 md:w-1/2 relative z-50">
                    <MainText>{header.name + " " + header.surname}</MainText>
                </Link>
                <div className="flex lg:items-center lg:flex-row w-full sm:flex-row-reverse sm:justify-start flex-row-reverse justify-start sm:gap-4 gap-4">
                <BurgerMenu burgerMenu={menu.mainHeader} />
                <ThemeIcon key={header.keyIcons} />
                </div>
            </HeaderSection>
            <StartPage>
                <Rounds />
                <HeaderImage path={header.path} />
                <HeaderTitle textFirst={header.firstTitle} textSecond={header.secondTitle} />
            </StartPage >
            <div className="w-full flex flex-col items-center gap-4">
                    <HeaderSecondText text={header.text} />
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