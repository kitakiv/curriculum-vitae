import experiences from "@/variables/experience/experience";
import CardWrapper from "@/components/wrapper/CardWrapper";
import { ExperienceCard } from "@/types/index";
import Link from "next/link";
export default function Cards({ cards }: { cards: ExperienceCard[] }) {
    return <div>{
        cards.map((card, index) => {
            return (
                <Link className="grid grid-cols-3 " key={`${experiences.name}-${card.title}-${index}`} href={`/${card.certificate}`} passHref>
                    <div className="grid col-span-1 relative">
                        <div className="flex items-center justify-center absolute top-0 right-0 translate-x-[50%] -translate-y-[20%] w-16 h-16 liquidGlass-elem liquidGlass-shadow rounded-full">
                        <img src={experiences.arrowSvg} alt={card.title} className="w-2/3 h-2/3"/>
                        </div>
                        <img className=" rounded-s-3xl " src={`/image/${card.certificate}`} alt={card.title} />
                    </div>
                    <CardWrapper tailwind="col-span-2">
                        <div key={card.title} className="w-full padding-elements">
                            <div className="flex flex-col items-center justify-center gap-2"></div>
                            <h3 className="text-lg font-bold">{card.title}</h3>

                        </div>
                    </CardWrapper>
                </Link>
            )
        })
    }</div>;
}