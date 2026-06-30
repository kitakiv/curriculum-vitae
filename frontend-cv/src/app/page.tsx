'use server'
import Header from "@/components/header/Header";
import AboutMeSection from "@/components/aboutme/AboutMeSection";
import ProjectSection from "@/components/projects/ProjectSection";
import Footer from "@/components/footer/Footer";
import ExperienceSection from "@/components/experience/ExperienceSection";
import TechStackSection from "@/components/techstack/TechStackSection";
import FlyModelSection from "@/components/3D/FlyModelSection";
import techStack from "@/variables/techstack/techstack";
import { getMe } from "@/query/auth.query";
import { GetUserMutation } from "@/gql/graphql";
import PhotoSection from "@/components/photosection/PhotoSection";


export type Props = {
  searchParams: Promise<{
    [techStack.searchParam]?: string;
    [techStack.searchParamCategory]?: string;
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const user: GetUserMutation['getUser'] | false = await getMe();
  
  return (
    <>
     <Header user={user} />
     <main className="flex flex-col items-center justify-between bg-gradient-to-r from-bg100 via-bg33 to-bg0">
      <FlyModelSection/>
      <AboutMeSection/>
      <ProjectSection selectedTechId={params[techStack.searchParam]} />
      <TechStackSection selectedCategoryId={params[techStack.searchParamCategory]}/>
      <ExperienceSection/>
       <PhotoSection/>
      </main>
      <Footer />
    </>
  );
}
