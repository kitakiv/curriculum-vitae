
import TextWhite from "@/components/text/TextWhite";
import TextGray from "@/components/text/TextGray";
import Link from "next/link";
import PinkButton from "@/components/button/PinkButton";
import Image from "next/image";
import projects, { projectImages } from "@/variables/projects/projects";
import GrayButton from "@/components/button/GrayButton";
import ProjectSlider from "./ProjectSlider";
import TechBlock from "@/components/button/TechBlock";
import SmallText from "@/components/text/SmallText";
import { GetProjectsByTechStackQuery, Project } from "@/gql/graphql";

export default function CardProject({project}: {project: GetProjectsByTechStackQuery["techstack"]["projects"][number]}) {
  const colours = ["bg100",
    "bg33",
    "bg0",
    "rn100",
    "rn0",
    "txSecond"];
    const random = colours[Math.floor(Math.random() * colours.length)];
    const random2 = colours[Math.floor(Math.random() * colours.length)];
  return (
    <div className="w-auto h-full bg-projectBg rounded-b-xl shadow-xl flex flex-col justify-between">
        <ProjectSlider images={projectImages} random={random} random2={random2} />
        <div className="flex flex-col lg:gap-6 md:gap-5 sm:gap-4 gap-4 lg:p-7 md:p-6 sm:p-4 p-2 items-start justify-end h-auto">
          <TextWhite>{project.projectTitle}</TextWhite>
          <TextGray>{project.projectDescription}</TextGray>
          {
            project.techStacks && (
              <div className="flex flex-col w-full gap-1">
              <SmallText tailwind="font-bold text-txSecond" >{projects.techStack.toUpperCase()}</SmallText>
              <div className="w-full h-[2px] bg-gradient-to-r from-light to-zOpacity rounded-full"></div>
              </div>
            )
          }
          {
            project?.techStacks?.map((tech) => (
              <TechBlock active={true} tailwind="gap-2"  key={`techStack-${tech.techName}-button`}>
                <img className="w-5 h-5" src={tech.techSvg} alt={`${tech.techName} logo`} />
                <SmallText tailwind="text-light">{tech.techName}</SmallText>
              </TechBlock>
            ))
          }
          <div className="flex gap-2">
          <Link href={project.projectDemoLink} target="_blank">
                <PinkButton tailwind="hover:shadow-lg hover:shadow-txSecond transition duration-700 lg:px-8 md:px-8 sm:px-4 px-2 lg:py-3 md:py-3  sm:py-1 py-1 lg:text-lg  sm:text-sm text-xs">
                    {projects.demoButton}
                </PinkButton>
            </Link>
            <Link href={project.projectGithubLink}>
                <GrayButton tailwind="flex gap-2 hover:shadow-lg hover:shadow-txSecond transition duration-700  lg:px-8 md:px-8 sm:px-4 px-2 lg:py-3 md:py-3 sm:py-1 py-1 lg:text-lg  sm:text-sm text-xs">
                {projects.githubButton}
                 <Image src={projects.githubSvg} alt="arrow" width={20} height={20} className="w-5 h-5"></Image>
                </GrayButton>
            </Link>
          </div>
        </div>
    </div>
  )
}