'use client'

import {  User } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";
import { UpdateUserInput } from "@/gql/graphql";

interface Props {
    initialValues: User,
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
            title={userUpdate.title}
        >
            <MainText tailwind="text-center">
                {userUpdate.title}
            </MainText>
        </FormUpdate>
    )

}