'use client'
import techStack from "@/variables/techstack/techstack";
import SkillButton from "@/components/button/SkillButton";
import TechStackIcon from "./TechStackIcon";
import Pagination from '@mui/material/Pagination';
import IconSection from "./IconSection";
import { TechStack, TechStackPaginationResponse } from "@/gql/graphql";
import LoadingTechStacks from "@/components/loader/LoadingTechStack";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTechStacksAll } from "@/query/techStack.query";
type TechStackProps = {
    categoryId: string;
};

export default function TechStacksComponent({ categoryId = techStack.all }: TechStackProps) {
    const defaultLimit = 10;
    const categId = categoryId === techStack.all ? undefined : categoryId;
    const [page, setPage] = useState(1);
    const { data, isFetching, error } =
        useQuery(getTechStacksAll({ limit: defaultLimit, page: page, categoryId: categId }));

    return (
        <>
            {isFetching ? (
                <IconSection>
                    <LoadingTechStacks length={5} />
                </IconSection>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    {(data as TechStackPaginationResponse).items.length > 0 ? (
                        <IconSection>
                            {
                                // @ts-ignore
                                (data as TechStackPaginationResponse).items.map((techStack: TechStack) => (
                                    <div className="relative tech-stack-icon" key={techStack.id} >
                                        <TechStackIcon techStack={techStack as TechStack} />
                                    </div>
                                ))
                            }
                        </IconSection>
                    ) : (
                        // empty placeholder when no projects available
                        <div className="col-span-full w-full h-40 flex items-center justify-center bg-zOpacity rounded">
                            <p className="text-gray-400">No techStack found for this tech category.</p>
                        </div>
                    )}
                    {(data as TechStackPaginationResponse).totalPages > 1 && (
                        <Pagination count={(data as TechStackPaginationResponse).totalPages} page={page} onChange={(e, page) => setPage(page)} />
                    )}

                    <SkillButton active={true} key={`techStack-showed-buttons`}>
                        <div className="flex gap-2 items-center justify-center" >
                            <img className="w-6 h-6" src={techStack.doneSvg} alt="lighting" />
                            {`Showing ${(data as TechStackPaginationResponse).items.length} of ${(data as TechStackPaginationResponse).total} tech stacks`}
                        </div>
                    </SkillButton>
                </>
            )}

        </>
    );
}

