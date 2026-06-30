"use client"
import { useRouter, useSearchParams } from "next/navigation"
import SkillButton from "@/components/button/SkillButton"
import { GetTechCategoriesQuery } from "@/gql/graphql"
import techStack from "@/variables/techstack/techstack"

export default function CategoryButtons({ categories }: { categories: GetTechCategoriesQuery["techCategories"]}) {
  const router = useRouter()
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get(techStack.searchParamCategory) || techStack.all;
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
           <div className="flex gap-4 items-center justify-center flex-wrap">
            {
                <SkillButton click={() => updateParam(techStack.searchParamCategory, techStack.all)} active={techStack.all === currentCategoryId} key={`techCategory-${techStack.all}-button`}>{techStack.all}</SkillButton>
            }
            { categories && categories.map((category) => (
                    <SkillButton click={() => updateParam(techStack.searchParamCategory, category.id)} active={category.id === currentCategoryId} key={`techStack-${category.categoryName}-button`}>{category.categoryName}</SkillButton>
                ))

            }
            </div>
        </>
    )
}