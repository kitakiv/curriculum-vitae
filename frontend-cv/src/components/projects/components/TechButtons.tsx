"use client"
import { useRouter, useSearchParams } from "next/navigation"
import SkillButton from "@/components/button/SkillButton"
import { GetTechStacksQuery } from "@/gql/graphql"
import projects from "@/variables/projects/projects"
import techStack from "@/variables/techstack/techstack"

export default function TechButtons({ techs }: { techs: GetTechStacksQuery["techstacks"]}) {
  const router = useRouter()
  const searchParams = useSearchParams();
   const currentTechId = searchParams.get(techStack.searchParam) || techStack.all;
  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }

    return (
        <>
           <div className="flex flex-wrap items-center justify-center gap-4">
            {
                <SkillButton click={() => updateParam(techStack.searchParam, techStack.all)} active={techStack.all === currentTechId} key={`techStack-${projects.all}-button`}>{projects.all}</SkillButton>
            }
            { techs && techs.map((tech) => (
                    <SkillButton click={() => updateParam(techStack.searchParam, tech.id)} active={tech.id === currentTechId} key={`techStack-${tech.techName}-button`}>{tech.techName}</SkillButton>
                ))
            }
            </div>
        </>
    )
}