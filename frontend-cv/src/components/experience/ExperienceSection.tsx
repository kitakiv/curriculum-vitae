import experiences, { cards } from '@/variables/experience/experience'
import FadeInSection from '@/components/animation/FadeInSection'
import TextHeading from '@/components/text/TextHeading'
import Cards from '@/components/experience/components/Cards'
import TextGray from '@/components/text/TextGray'
import TimeLine from './components/TimeLine'
import SceneRobot from '../3D/robot/SceneRobot'
import TextPortfolio from '../text/TextPortfolio'
import { getCertificatesCached } from '@/query/certificate.query'
import { GetCertificatesQuery } from '@/gql/graphql'
export default async function ExperienceSection() {
    const certificates: GetCertificatesQuery["certificates"] = await getCertificatesCached()
    return <section className='flex flex-col w-full items-center justify-center padding gap-4 relative' id={experiences.id}>
        <FadeInSection>
            <TextPortfolio tailwind="text-center">{experiences.portfolio}</TextPortfolio>
            <TextHeading>{experiences.heading}</TextHeading>
        </FadeInSection>
        <FadeInSection>
            <TextGray tailwind="text-center">{experiences.text}</TextGray>
        </FadeInSection>
        <SceneRobot tailwind='robot'></SceneRobot>
        <div className="grid lg:grid-cols-7 md:grid-cols-7 sm:grid-cols-4 grid-cols-4 gap-4 w-full">
        <Cards certificates={certificates} />
        <TimeLine />
        </div>
    </section>
}