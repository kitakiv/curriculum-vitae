import Header from "@/components/header/Header";
import AboutMeSection from "@/components/aboutme/AboutMeSection";
import ProjectSection from "@/components/projects/ProjectSection";

export default async function Page() {
  return (
    <>
     <Header />
     <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-bg100 via-bg33 to-bg0">
      <AboutMeSection/>
      <ProjectSection/>
    </main>
    </>
  );
}
