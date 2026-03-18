import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateCertificateInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";

export default function CreateCertificateForm() {
    const certificateCreate = resourceConfig[Resource.CERTIFICATE].createForm;
    return (
        <>
            <FormCreate<CreateCertificateInput>
                inputs={certificateCreate.inputs}
                intialValues={certificateCreate.initialValues}
                actionForm={(formData) => certificateCreate.action(undefined, formData)}
                schema={certificateCreate.schema}
                title={certificateCreate.title}
            >
                <MainText tailwind="text-center">
                    {certificateCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}