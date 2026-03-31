import {  TechStack, UpdateTechStackInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    initialValues: TechStack,
    resourceId: string,
    inputs: InputType[] | null
}

export default function UpdateFormTechStack({initialValues, resourceId, inputs }: Props) {
    const techStackUpdate = resourceConfig[Resource.TECHSTACK].editForm;
    const projects = initialValues.projects?.map(project => project.id);
    const techCategories = initialValues.techCategories?.map(category => category.id);
    const updatedInitialValues = {...initialValues,
        projects: projects? projects : [],
        techCategories: techCategories? techCategories : []
    };
    return (
        <FormUpdate<UpdateTechStackInput>
            inputs={inputs ? inputs : techStackUpdate.inputs}
            intialValues={updatedInitialValues}
            actionForm={(formData) =>
                techStackUpdate.action(
                    undefined,
                    formData,
                    initialValues,
                    resourceId
                )
            }
            schema={techStackUpdate.schema}
            title={techStackUpdate.title}
        >
            <MainText tailwind="text-center">
                {techStackUpdate.title}
            </MainText>
        </FormUpdate>
    )

}