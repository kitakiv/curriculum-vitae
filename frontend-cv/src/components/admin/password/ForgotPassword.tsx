'use client'
import { resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import MainText from "@/components/text/MainText";
import { ForgotPasswordInput } from "@/gql/graphql";

export default function ForgotPassword() {
    const form = resourceConfig.forgotPassword;
    const inputs = form.inputs;
    const initialValues = form.initialValues;
    return (
        <>
            <FormCreate<ForgotPasswordInput>
                inputs={inputs}
                intialValues={initialValues}
                actionForm={(formData) => form.action(undefined, formData)}
                schema={form.schema}
                title={form.button}
                tailwind='padding-elements gap-4 grid xl:w-[30vw] lg:w-[40vw] md:w-[40vw] sm:w-full w-full  liquidGlass-elem liquidGlass-shadow rounded-lg '
            >
                <MainText tailwind="text-center">
                    {form.title}
                </MainText>
            </FormCreate>
        </>
    )
}