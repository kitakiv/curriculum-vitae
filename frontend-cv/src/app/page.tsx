import Header from "@/components/header/Header";
import AboutMeSection from "@/components/aboutme/AboutMeSection";
import ProjectSection from "@/components/projects/ProjectSection";
import Footer from "@/components/footer/Footer";
import ExperienceSection from "@/components/experience/ExperienceSection";
import TechStackSection from "@/components/techstack/TechStackSection";
import FlyModelSection from "@/components/3D/FlyModelSection";

export type Props = {
  params: {
    techId: string;
    projectId: string;
  }
}

export default async function Page({ params }: Props) {
  const { techId, projectId } = params;
  return (
    <>
     <Header />
     <main className="flex flex-col items-center justify-between bg-gradient-to-r from-bg100 via-bg33 to-bg0">
      <FlyModelSection/>
      <AboutMeSection/>
      <ProjectSection selectedTechId={techId} />
      <TechStackSection/>
      <ExperienceSection/>
      </main>
      <Footer />
    </>
  );
}
