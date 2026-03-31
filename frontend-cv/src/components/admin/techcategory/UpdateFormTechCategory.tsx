import {  TechCategorUpdateTechCateUpdateTechCategoryInput, goryInput, y, TechSt, UpdateTechCategoryInput, UpdateTechCategoryInput, UpdateTechCategoryInputack, UpdateTechStackInput, TechCategory } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    initialValues: TechCategory,
    resourceId: string,
    inputs: InputType[] | null
}

export default function UpdateFormTechCategory({initialValues, resourceId, inputs }: Props) {
    const techCategoryUpdate = resourceConfig[Resource.CATEGORY].editForm;
   const techStacks = initialValues.techStacks?.map(techStack => techStack.id);
    const updatedInitialValues = {...initialValues,
       techStacks: techStacks? techStacks : []
    };
    return (
        <FormUpdate<UpdateTechCategoryInput>
            inputs={inputs ? inputs : techCategoryUpdate.inputs}
            intialValues={updatedInitialValues}
            actionForm={(formData) =>
                techCategoryUpdate.action(
                    undefined,
                    formData,
                    initialValues,
                    resourceId
                )
            }
            schema={techCategoryUpdate.schema}
            title={techCategoryUpdate.title}
        >
            <MainText tailwind="text-center">
                {techCategoryUpdate.title}
            </MainText>
        </FormUpdate>
    )

}