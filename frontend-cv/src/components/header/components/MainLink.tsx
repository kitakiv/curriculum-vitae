import FadeInSection from "@/components/animation/FadeInSection";
import Link from "next/link";
import MainText from "@/components/text/MainText";
import { GetProfileQuery } from "@/gql/graphql";

interface Props {
    href: string,
    profile: GetProfileQuery["profile"]
}

export default function MainLink({ href, profile }: Props) {
    return (
        <FadeInSection delay={100} animation={{ visible: "translateX(0)", hidden: "translateX(-50%)" }}>
                        <Link href='/' className="lg:w-5/12 md:w-1/2 relative z-50">
                            <MainText>{profile.name + " " + profile.surname}</MainText>
                        </Link>
                    </FadeInSection>
    )
}