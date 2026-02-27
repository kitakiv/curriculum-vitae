import techStack, { techStacks } from "@/variables/techstack/techstack"
import FadeInSection from "../animation/FadeInSection"
import TextHeading from "../text/TextHeading"
import TextGray from "../text/TextGray"
import TextPortfolio from "../text/TextPortfolio"
import TechStacksComponent from "./components/TechStacksComponents"
import CategoryButtons from "./components/CategoryButtons"
import { getTechCategoriesCached } from "@/query/techCategory.query"
import { GetTechCategoriesQuery } from "@/gql/graphql"

export default async function TechStackSection({selectedCategoryId = techStack.all}: {selectedCategoryId?: string | null}) {
    const techCategories: GetTechCategoriesQuery["techCategories"] = await getTechCategoriesCached();
    return  <section className="flex flex-col overflow-hidden items-center justify-center padding gap-4" id={techStack.id}>
    <FadeInSection>
    <TextPortfolio tailwind="text-center">{techStack.portfolio}</TextPortfolio>
    <TextHeading>{techStack.heading}</TextHeading>
    </FadeInSection>
    <FadeInSection tailwind="w-full text-center">
    <TextGray tailwind="text-center w-full text-wrap">{techStack.text}</TextGray>
    </FadeInSection>
    <CategoryButtons categories={techCategories} />
    <TechStacksComponent categoryId={selectedCategoryId || techStack.all}/>
    
</section>
}