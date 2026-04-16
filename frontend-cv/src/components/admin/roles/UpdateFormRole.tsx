import { Role, UpdateProjectInput, UpdateRoleInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    initialValues:Role,
    resourceId: string,
    inputs: InputType[] | null,
    initialValuesFields: {
        name: string,
        permissions: Record<string, Record<string, boolean>>
    
    }
}

export default function UpdateFormRole({initialValues, resourceId, inputs, initialValuesFields }: Props) {
    const roleUpdate = resourceConfig[Resource.ROLE].editForm;
    return (
        <FormUpdate<UpdateRoleInput>
            inputs={inputs ? inputs : roleUpdate.inputs}
            intialValues={initialValuesFields}
            actionForm={(formData) =>
                roleUpdate.action(
                    undefined,
                    formData,
                    initialValues,
                    resourceId
                )
            }
            schema={roleUpdate.schema}
            title={roleUpdate.title}
        >
            <MainText tailwind="text-center">
                {roleUpdate.title}
            </MainText>
        </FormUpdate>
    )

}