import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateProjectInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    inputs: InputType[] | null;
}   

export default function CreateFormProject({ inputs }: Props) {
    const projectCreate = resourceConfig[Resource.PROJECT].createForm;
    return (
        <>
            <FormCreate<CreateProjectInput>
                inputs={inputs || projectCreate.inputs}
                intialValues={projectCreate.initialValues}
                actionForm={(formData) => projectCreate.action(undefined, formData)}
                schema={projectCreate.schema}
                title={projectCreate.title}
            >
                <MainText tailwind="text-center">
                    {projectCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}