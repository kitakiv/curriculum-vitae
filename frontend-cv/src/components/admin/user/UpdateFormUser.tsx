'use client'

import {  User } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import MainText from "@/components/text/MainText";
import { UpdateUserInput } from "@/gql/graphql";
import FormUpdate from "@/components/admin/components/FormUpdate";
import { GetUserMutation } from "@/gql/graphql";
interface Props {
    initialValues: GetUserMutation['getUser'],
    resourceId: string,
}
export default function UpdateFormUser({initialValues, resourceId }: Props) {
    const userUpdate = resourceConfig[Resource.USER].editForm;
    const initialValuesEmpty = userUpdate.initialValues;
    Object.keys(initialValuesEmpty).forEach((key: string) => {
        // @ts-ignore
        initialValuesEmpty[key] = initialValues[key];
    })

    return (
        <FormUpdate<UpdateUserInput>
            inputs={userUpdate.inputs}
            intialValues={initialValuesEmpty}
            actionForm={(formData) =>
                userUpdate.action(
                    undefined,
                    formData,
                    initialValuesEmpty,
                    resourceId
                )
            }
            schema={userUpdate.schema}
            // @ts-ignore
            title={userUpdate.title}
        >
        </FormUpdate>
    )

}