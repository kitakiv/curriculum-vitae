
import HeaderSection from "@/components/header/components/HeaderSection";
import ThemeIcon from "@/components/header/components/ThemeIcon";
import header from "@/variables/header/header";
import Link from "next/link";
import MainText from "@/components/text/MainText";
import { getProfileCached } from "@/query/profile.query";
import { GetProfileQuery } from "@/gql/graphql";

export default async function HeaderAdmin() {
    const profile: GetProfileQuery["profile"] = await getProfileCached();
    return (
        <HeaderSection>
                <Link href='/' className="lg:w-5/12 md:w-1/2 relative z-50">
                    <MainText>{profile.name + " " + profile.surname}</MainText>
                </Link>
                <ThemeIcon key={header.keyIcons} />
        </HeaderSection>
    );
}