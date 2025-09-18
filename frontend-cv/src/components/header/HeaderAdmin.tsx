
import HeaderSection from "@/components/header/components/HeaderSection";
import ThemeIcon from "@/components/header/components/ThemeIcon";
import header from "@/variables/header/header";
import menu from "@/variables/menu/menu";
import Link from "next/link";
import MainText from "@/components/text/MainText";
import BurgerMenu from "@/components/header/components/Menu";
export default async function HeaderAdmin() {
    return (
        <HeaderSection>
                <Link href='/' className="lg:w-5/12 md:w-1/2">
                    <MainText>{header.name + " " + header.surname}</MainText>
                </Link>
                <div className="flex lg:items-center lg:flex-row w-full sm:flex-row-reverse sm:justify-start flex-row-reverse justify-start sm:gap-4">
                <BurgerMenu burgerMenu={menu.adminHeader} />
                <ThemeIcon key={header.keyIcons} />
                </div>
            </HeaderSection>
    );
}