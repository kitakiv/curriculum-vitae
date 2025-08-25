import Header from "@/components/header/Header";
import AboutMeSection from "@/components/aboutme/AboutMeSection";
import ProjectSection from "@/components/projects/ProjectSection";
import Footer from "@/components/footer/Footer";

export default async function Page() {
  return (
    <>
     <Header />
     <main className="flex flex-col items-center justify-between bg-gradient-to-b from-bg100 via-bg33 to-bg0">
      <AboutMeSection/>
      <ProjectSection/>
    </main>
     <Footer />
    </>
  );
}
