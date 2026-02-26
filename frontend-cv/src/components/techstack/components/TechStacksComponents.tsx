'use server'
import techStack from "@/variables/techstack/techstack";
import SkillButton from "@/components/button/SkillButton";
import { GetTechStacksQuery, TechCategoryQuery } from "@/gql/graphql";
import { getTechStackByTechCategoryCached } from "@/query/techCategory.query";
import TechStackIcon from "./TechStackIcon";
import IconSection from "./IconSection";
import { getTechStacksCached } from "@/query/techStack.query";
type TechStackProps = {
    categoryId: string;
};

export default async function TechStacksComponent({ categoryId = techStack.all}: TechStackProps) {
    const allTechStacks: GetTechStacksQuery["techstacks"] = await getTechStacksCached() || [];
    const techStacksToShow: GetTechStacksQuery["techstacks"] | TechCategoryQuery["techCategory"]["techStacks"] =
        categoryId === techStack.all ? allTechStacks : (await getTechStackByTechCategoryCached(categoryId)) || [];

    const shownCount = techStacksToShow?.length ?? 0;
    const totalCount = allTechStacks?.length ?? 0;

    return (
        <>
                {shownCount > 0 ? (
                    <IconSection>{
                    techStacksToShow.map((techStack, index) => (
                        <div className="relative tech-stack-icon" key={`techStack-${index}`} >
                            <TechStackIcon techStack={techStack} />
                        </div>
                    ))
                    }</IconSection>
                ) : (
                    // empty placeholder when no projects available
                    <div className="col-span-full w-full h-40 flex items-center justify-center bg-zOpacity rounded">
                        <p className="text-gray-400">No techStack found for this tech category.</p>
                    </div>
                )}

            <SkillButton active={true} key={`techStack-showed-buttons`}>
                <div className="flex gap-2 items-center justify-center" >
                    <img className="w-6 h-6" src={techStack.doneSvg} alt="lighting" />
                    {`Showing ${shownCount} of ${totalCount} tech stacks`}
                </div>
            </SkillButton>
        </>
    );
}

