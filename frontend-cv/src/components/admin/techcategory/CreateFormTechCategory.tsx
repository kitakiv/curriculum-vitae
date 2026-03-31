import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateTechCategoryInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    inputs: InputType[] | null;
}   

export default function CreateFormTechCategory({ inputs }: Props) {
    const techCategoryCreate = resourceConfig[Resource.CATEGORY].createForm;
    return (
        <>
            <FormCreate<CreateTechCategoryInput>
                inputs={inputs || techCategoryCreate.inputs}
                intialValues={techCategoryCreate   .initialValues}
                actionForm={(formData) => techCategoryCreate.action(undefined, formData)}
                schema={techCategoryCreate.schema}
                title={techCategoryCreate.title}
            >
                <MainText tailwind="text-center">
                    {techCategoryCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}