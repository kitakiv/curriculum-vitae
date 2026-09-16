'use client'
import { resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import MainText from "@/components/text/MainText";
import { ChangePasswordInput } from "@/gql/graphql";

export default function ChangePassword() {
    const form = resourceConfig.changePassword;
    const inputs = form.inputs;
    const initialValues = form.initialValues;
    return (
        <>
            <FormCreate<ChangePasswordInput>
                inputs={inputs}
                intialValues={initialValues}
                actionForm={(formData) => form.action(undefined, formData)}
                schema={form.schema}
                title={form.button}
            >
                <MainText tailwind="text-center">
                    {form.title}
                </MainText>
            </FormCreate>
        </>
    )
}