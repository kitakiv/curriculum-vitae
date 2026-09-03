'use client'

import CardProject from "@/components/projects/components/CardProject";
import FadeInSection from "@/components/animation/FadeInSection";
import techStack, { buttons } from "@/variables/techstack/techstack";
import flyModel from "@/variables/3d/flymodel";
import SkillButton from "@/components/button/SkillButton";
import { getProjectsAll } from "@/query/project.query";
import { useQuery } from "@tanstack/react-query";
import Pagination from '@mui/material/Pagination';
import React from "react";
import LoadingProject from "@/components/loader/LoadingProject";
import { ProjectPaginationResponse } from "@/gql/graphql";
import { Project } from "@/gql/graphql";

type ProjectsProps = {
    columns?: number;
    techId?: string;
};

export default function ProjectComponent({ columns = 2, techId = techStack.all }: ProjectsProps) {
    const [page, setPage] = React.useState(1);
    const defaultLimit = 10;
    const colsClass =
        columns === 1
            ? "grid-cols-1"
            : columns === 2
            ? "lg:grid-cols-2 md:grid-cols-2 grid-cols-1"
            : `lg:grid-cols-${columns}`;


    const techStackId = techId === techStack.all ? undefined : techId;
    const { data, isFetching, error } = 
    useQuery(getProjectsAll({limit: defaultLimit, page: page, techId: techStackId}));
    return (
        <>
            {isFetching ? (
        <div className={`grid ${colsClass} gap-4 w-full`}>{
            columns === 1 ? (
                <LoadingProject />
            ) : (
            Array.from({ length: columns }).map((_, index) => (
                <LoadingProject key={`project-${index}`} />
            )
            ))
        }
        </div>
            ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
            <div id={flyModel.stopId} className={`grid ${colsClass} gap-4 w-full`}>
                {(data as ProjectPaginationResponse).items.length > 0 ? (
                    (data as ProjectPaginationResponse).items.map((project: Project, index: number) => (
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
            {(data as ProjectPaginationResponse).totalPages > 1 && (
                <Pagination count={(data as ProjectPaginationResponse).totalPages} page={page} onChange={(e, page) => setPage(page)} />
            )}
            <SkillButton active={true} key={`techStack-${buttons[0]}-button`}>
                <div className="flex gap-2 items-center justify-center">
                    {`Showing ${ (data as ProjectPaginationResponse).items.length } of ${ (data as ProjectPaginationResponse).total } projects`}
                </div>
            </SkillButton>
        </>
    )}
        </>
    );
}

