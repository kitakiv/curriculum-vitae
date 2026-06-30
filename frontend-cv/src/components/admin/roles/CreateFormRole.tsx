import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateRoleInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import { InputType } from "@/types/index";

interface Props {
    inputs: InputType[] | null;
    initialValues?: object
}   

export default function CreateFormRole({ inputs, initialValues }: Props) {
    console.log('inputs', inputs);
    const roleCreate = resourceConfig[Resource.ROLE].createForm;
    return (
        <>
            <FormCreate<CreateRoleInput>
                inputs={inputs || roleCreate.inputs}
                intialValues={initialValues || roleCreate.initialValues}
                actionForm={(formData) => roleCreate.action(undefined, formData)}
                schema={roleCreate.schema}
                title={roleCreate.title}
            >
                <MainText tailwind="text-center">
                    {roleCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}