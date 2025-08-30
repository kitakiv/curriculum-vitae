import FadeInSection from "@/components/animation/FadeInSection"

export default function HeaderTitle({textFirst, textSecond}: {textFirst: string, textSecond: string}) {
    return (
        <>
        <FadeInSection delay={800} animation={{visible: "translateX(0)", hidden: "translateX(-50%)"}}><span className="absolute lg:text-9xl md:text-8xl sm:text-7xl lg:left-11 sm:left-11 left-8 lg:top-9 md:top-11 sm:top-14 top-16 text-5xl bg-gradient-to-r from-txFirst0 to-txFirst100 bg-clip-text text-transparent font-extrabold text-shadow-bg0 peer-hover:animate-pulse">{textFirst.toUpperCase()}</span></FadeInSection>
        <FadeInSection delay={1600} animation={{visible: "translateX(0)", hidden: "translateX(50%)"}}><span className="absolute lg:text-9xl md:text-8xl sm:text-7xl lg:right-11 sm:right-11 right-8 text-5xl lg:top-96 sm:top-96 top-72 bg-gradient-to-r from-txFirst100 to-txFirst0 bg-clip-text text-transparent font-extrabold z-40 text-shadow-bg0 peer-hover:animate-pulse">{textSecond.toUpperCase()}</span></FadeInSection>
        </>
    )
}