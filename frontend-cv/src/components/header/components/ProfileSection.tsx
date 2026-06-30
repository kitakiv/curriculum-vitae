import header from "@/variables/header/header";
import StartPage from "./StartPage";
import HeaderImage from "./HeaderImage";
import HeaderTitle from "./HeaderTitle";
import HeaderSecondText from "./HeaderSecondText";
import HeaderModel from "./HeaderModel";
import PinkButton from "../../button/PinkButton";
import Image from "next/image";
import Link from "next/link";
import aboutme from "@/variables/aboutme/aboutme";


interface Props {
    profile: GetProfileQuery["profile"];
}

export default function ProfileSection({profile}: Props) {
    return (<>
       
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
    </>)
}