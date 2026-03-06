import Header from "@/components/header/Header";
import AboutMeSection from "@/components/aboutme/AboutMeSection";
import ProjectSection from "@/components/projects/ProjectSection";
import Footer from "@/components/footer/Footer";
import ExperienceSection from "@/components/experience/ExperienceSection";
import TechStackSection from "@/components/techstack/TechStackSection";
import FlyModelSection from "@/components/3D/FlyModelSection";
import techStack from "@/variables/techstack/techstack";
import { setAccessToken } from "@/lib/auth";

export type Props = {
  searchParams: Promise<{
    [techStack.searchParam]?: string;
    [techStack.searchParamCategory]?: string;
    token?: string;
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  if (params.token) {
    await setAccessToken(params.token);
    console.log(params.token)
  }
  
  
  return (
    <>
     <Header />
     <main className="flex flex-col items-center justify-between bg-gradient-to-r from-bg100 via-bg33 to-bg0">
      <FlyModelSection/>
      <AboutMeSection/>
      <ProjectSection selectedTechId={params[techStack.searchParam]} />
      <TechStackSection selectedCategoryId={params[techStack.searchParamCategory]}/>
      <ExperienceSection/>
      </main>
      <Footer />
    </>
  );
}
