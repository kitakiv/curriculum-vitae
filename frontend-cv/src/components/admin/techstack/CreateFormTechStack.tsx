import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateTechStackInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    inputs: InputType[] | null;
}   

export default function CreateFormTechStack({ inputs }: Props) {
    const techStackCreate = resourceConfig[Resource.TECHSTACK].createForm;
    return (
        <>
            <FormCreate<CreateTechStackInput>
                inputs={inputs || techStackCreate.inputs}
                intialValues={techStackCreate   .initialValues}
                actionForm={(formData) => techStackCreate.action(undefined, formData)}
                schema={techStackCreate.schema}
                title={techStackCreate.title}
            >
                <MainText tailwind="text-center">
                    {techStackCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}