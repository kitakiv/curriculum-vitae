import {  AttachRoleInput, User } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";
import FormUpdate from "../components/FormUpdate";

interface Props {
    initialValues: User,
    resourceId: string,
}

export default function AttachFormRoleUser({initialValues, resourceId }: Props) {
    const userAttachForm = resourceConfig[Resource.USER].attachRole;
    const intialValuesAttachRole = {
        userId: initialValues.id,
        roleId: initialValues.role ? initialValues.role.id : "",
    }
    return (
        <FormUpdate<AttachRoleInput>
            inputs={userAttachForm.inputs as InputType[]}
            intialValues={intialValuesAttachRole}
            actionForm={(formData) =>
                userAttachForm.action(
                    undefined,
                    formData,
                    initialValues,
                    resourceId
                )
            }
            schema={userAttachForm.schema(resourceId)}
            title={userAttachForm.title}
        >
            <MainText tailwind="text-center">
                {userAttachForm.title}
            </MainText>
        </FormUpdate>
    )

}