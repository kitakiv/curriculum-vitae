import HeaderSection from "./components/HeaderSection"
import MainText from "@/components/text/MainText"
import ThemeIcon from "@/components/header/components/ThemeIcon"
import header from "@/variables/header/header"
import Link from "next/link"

export default function HeaderLogin() {
    return (
        <HeaderSection>
                <Link href='/'>
                    <MainText>{header.name + " " + header.surname}</MainText>
                </Link>
                <ThemeIcon key={header.keyIcons} />
            </HeaderSection>
    )
}