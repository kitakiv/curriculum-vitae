import { FollowCard } from "@/types/index";
import FollowButton from "@/components/button/FollowButton";
import Image from "next/image";
import FadeInSection from "@/components/animation/FadeInSection";
import projects from "@/variables/projects/projects";

export default function FollowMe({links}: {links : FollowCard[]}) {
    return (
            <div className="grid grid-cols-2 lg:gap-6 sm:gap-4 gap-2">
                {links.map((item, index) => (
                    <FadeInSection key={`link-${index}`} >
                    <a  href={item.link} target="_blank" rel="noopener noreferrer">
                        <FollowButton tailwind="flex gap-2">
                            <Image src={item.svg === "" || !item.svg ? projects.defaultImage : item.svg} alt={item.name} width={20} height={20} className="w-5 h-5"/>
                            <span className="lg:text-lg md:text-md text-sm text-wrap text-footerTx font-semibold" >{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                        </FollowButton>
                    </a>
                    </FadeInSection>
                ))}
            </div>
    )
}