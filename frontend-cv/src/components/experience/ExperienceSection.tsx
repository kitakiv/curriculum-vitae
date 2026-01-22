import experiences, { cards } from '@/variables/experience/experience'
import FadeInSection from '@/components/animation/FadeInSection'
import TextHeading from '@/components/text/TextHeading'
import Cards from '@/components/experience/components/Cards'
import ExperienceModel from '@/components/experience/components/ExperienceModel'
import TextGray from '@/components/text/TextGray'
export default function ExperienceSection() {
    return <section className='flex flex-col w-full items-center justify-center padding gap-4 relative' id={experiences.id}>
        <FadeInSection>
            <TextHeading>{experiences.heading}</TextHeading>
        </FadeInSection>
        <FadeInSection>
            <TextGray tailwind="text-center">{experiences.text}</TextGray>
        </FadeInSection>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 w-full">
        <Cards cards={cards} />
        <ExperienceModel />
        </div>
    </section>
}