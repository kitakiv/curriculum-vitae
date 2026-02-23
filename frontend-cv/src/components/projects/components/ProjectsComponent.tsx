'use server'

import CardProject from "@/components/projects/components/CardProject";
import FadeInSection from "@/components/animation/FadeInSection";
import techStack, { buttons } from "@/variables/techstack/techstack";
import flyModel from "@/variables/3d/flymodel";
import SkillButton from "@/components/button/SkillButton";
import { getProjectsByTechStackCached } from "@/query/techStack.query";
import { getProjectsCached } from "@/query/project.query";
import { GetProjectsByTechStackQuery, GetProjectsQuery } from "@/gql/graphql";
type ProjectsProps = {
    columns?: number;
    techId?: string;
};

export default async function ProjectComponent({ columns = 2, techId = techStack.all }: ProjectsProps) {
    const colsClass =
        columns === 1
            ? "grid-cols-1"
            : columns === 2
            ? "lg:grid-cols-2 md:grid-cols-2 grid-cols-1"
            : `lg:grid-cols-${columns}`;

    const allProjects: GetProjectsQuery["projects"] = (await getProjectsCached()) || [];
    const projectsToShow: GetProjectsQuery["projects"] | GetProjectsByTechStackQuery["techstack"]["projects"] =
        techId === techStack.all ? allProjects : (await getProjectsByTechStackCached(techId)) || [];

    const shownCount = projectsToShow?.length ?? 0;
    const totalCount = allProjects?.length ?? 0;

    return (
        <>
            <div id={flyModel.stopId} className={`grid ${colsClass} gap-4 w-full`}>
                {shownCount > 0 ? (
                    projectsToShow.map((project, index) => (
                        <FadeInSection key={`project-${project?.id ?? index}`}>
                            <CardProject project={project} />
                        </FadeInSection>
                    ))
                ) : (
                    // empty placeholder when no projects available
                    <div className="col-span-full w-full h-40 flex items-center justify-center bg-zOpacity rounded">
                        <p className="text-gray-400">No projects found for this tech stack.</p>
                    </div>
                )}
            </div>

            <SkillButton active={true} key={`techStack-${buttons[0]}-button`}>
                <div className="flex gap-2 items-center justify-center">
                    {`Showing ${shownCount} of ${totalCount} projects`}
                </div>
            </SkillButton>
        </>
    );
}

