import {  AttachRoleInput, User } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";
import FormUpdate from "../components/FormUpdate";
import UserInfo from "@/components/admin/UserInfo";

interface Props {
    initialValues: User,
    resourceId: string,
    inputs: InputType[] | null
}

export default function AttachFormRoleUser({initialValues, resourceId, inputs }: Props) {
    
    const userAttachForm = resourceConfig[Resource.USER].attachRole;
    const intialValuesAttachRole = {
        userId: initialValues.id,
        roleId: initialValues.role ? initialValues.role.id : "",
    }
    return (
        <FormUpdate<AttachRoleInput>
            inputs={inputs as InputType[]}
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
            <>
            <MainText tailwind="text-center">
                {userAttachForm.title}
            </MainText>
            {/* @ts-ignore */}
            <UserInfo user={initialValues as User}/>
          </> 
        </FormUpdate>
    )

}