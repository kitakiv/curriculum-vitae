'use client'
import experiences from "@/variables/experience/experience";
import CardWrapper from "@/components/wrapper/CardWrapper";
import { ExperienceCard } from "@/types/index";
import Link from "next/link";
import MainText from "@/components/text/MainText";
import MiddleText from "@/components/text/MiddleText";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProgressRounds from "@/components/experience/components/Rounds";
import ArrowWrapper from "@/components/experience/components/ArrowWrapper";
import { GetCertificatesQuery } from "@/gql/graphql";

gsap.registerPlugin(ScrollTrigger);
export default function Cards({ certificates }: { certificates: GetCertificatesQuery["certificates"]}) {
    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((card) => {
            gsap.fromTo(
                card,
                {
                  xPercent: -100,
                  opacity: 0,
                  ease: 'power2.in',
                },
                {
                  xPercent: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power2.inOut',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                  },
                }
              );
        });
        gsap.utils.toArray<HTMLElement>('.timeline-round').forEach((round) => {
            gsap.fromTo(
                round,
                {
                  scale: 0,
                  ease: 'power2.in',
                },
                {
                  scale: 1,
                  duration: 0.7,
                  ease: 'power2.inOut',
                  scrollTrigger: {
                    trigger: round,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                  },
                }
              );
        })
    }, []);
    const colors = ["gradient-round-two", "gradient-round-three", "gradient-round-one"];
    return <div className=" xl:col-span-3 xl:col-start-2 xl:col-end-5 lg:col-span-4 lg:col-start-2 lg:col-end-6 md:col-span-4 md:col-start-2 md:col-end-6 col-span-5 col-start-2 col-end-7 md:mr-9 sm:mr-9 mr-9 flex flex-col gap-4">{
        certificates.map((certificate, index) => {
            const colorRound = colors[index % colors.length];
            return (
                <Link className="timeline-card relative z-10 xl:grid lg:grid xl:grid-cols-3 lg:grid-cols-3 flex-col  hover:shadow-lg hover:shadow-txSecond xl:rounded-s-3xl lg:rounded-s-3xl md:rounded-t-3xl sm:rounded-t-3xl rounded-t-3xl transition-all duration-700 liquidGlass-elem" key={certificate.id} href={`/${certificate.id}`} passHref>
                    <ProgressRounds tailwind="timeline-round" colorRound={colorRound} />
                    <ArrowWrapper tailwind="grid col-span-1">
                        <img className=" xl:rounded-s-3xl lg:rounded-s-3xl md:rounded-t-3xl sm:rounded-t-3xl rounded-t-3xl object-cover  image-mask-right xl:h-full lg:h-full md:w-full sm:w-full w-full" src={`/image/${certificate.certificateImage}`} alt={certificate.certificateTitle} />
                    </ArrowWrapper>
                    <CardWrapper tailwind="col-span-2 grid grid-rows-6 padding-elements liquid-glass-burger">
                    <MainText tailwind="row-span-1">{certificate.certificateTitle}</MainText>
                    <MiddleText tailwind="text-txSecond opacity-80 row-span-3 row-start-2 row-end-4 flex items-center">
                        {certificate.certificateDescription}
                    </MiddleText>
                    <MiddleText tailwind="text-txSecond font-bold opacity-80 row-span-1 row-start-5 row-end-6">
                        <img src={experiences.periodSvg} alt={experiences.periodSvg} className="w-5 h-5 inline mr-2" />
                        {`${certificate.certificatePeriodStart} - ${certificate.certificatePeriodEnd}`}
                    </MiddleText>
                    <MiddleText tailwind="text-txSecond font-bold opacity-80 row-span-1 row-start-6 row-end-7">
                        <img src={experiences.companySvg} alt={experiences.companySvg} className="w-5 h-5 inline mr-2" />
                        {certificate.certificateCompany}
                    </MiddleText>
                    </CardWrapper>
                </Link>
            )
        })
    }</div>;
}