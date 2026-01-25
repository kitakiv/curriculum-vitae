import Header from "@/components/header/Header";
import AboutMeSection from "@/components/aboutme/AboutMeSection";
import ProjectSection from "@/components/projects/ProjectSection";
import Footer from "@/components/footer/Footer";
import ExperienceSection from "@/components/experience/ExperienceSection";
import TechStackSection from "@/components/techstack/TechStackSection";

export default async function Page() {
  return (
    <>
     <Header />
     <main className="flex flex-col items-center justify-between bg-gradient-to-r from-bg100 via-bg33 to-bg0">
      <AboutMeSection/>
      <ProjectSection/>
      <TechStackSection/>
      <ExperienceSection/>
      </main>
      <Footer />
    </>
  );
}
