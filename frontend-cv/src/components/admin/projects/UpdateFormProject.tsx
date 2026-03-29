import { Project, UpdateProjectInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    initialValues: Project,
    resourceId: string,
    inputs: InputType[] | null
}

export default function UpdateFormProject({initialValues, resourceId, inputs }: Props) {
    const projectUpdate = resourceConfig[Resource.PROJECT].editForm;
    const techStacks = initialValues.techStacks?.map((tech) => tech.id);
    const initialValuesWithTechStacks = {
        ...initialValues,
        techStacks: techStacks || []
    }

    return (
        <FormUpdate<UpdateProjectInput>
            inputs={inputs ? inputs : projectUpdate.inputs}
            intialValues={initialValuesWithTechStacks}
            actionForm={(formData) =>
                projectUpdate.action(
                    undefined,
                    formData,
                    initialValues,
                    resourceId
                )
            }
            schema={projectUpdate.schema}
            title={projectUpdate.title}
        >
            <MainText tailwind="text-center">
                {projectUpdate.title}
            </MainText>
        </FormUpdate>
    )

}