import { Certificate, CreateCertificateInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";

interface Props {
    initialValues: Certificate,
    resourceId: string,
}
export default function UpdateFormCertificate({initialValues, resourceId }: Props) {
    const certificateUpdate = resourceConfig[Resource.CERTIFICATE].editForm;

    return (
        <FormUpdate<CreateCertificateInput>
            inputs={certificateUpdate.inputs}
            intialValues={initialValues}
            actionForm={(formData) =>
                certificateUpdate.action(
                    undefined,
                    formData,
                    initialValues,
                    resourceId
                )
            }
            schema={certificateUpdate.schema}
            title={certificateUpdate.title}
        >
            <MainText tailwind="text-center">
                {certificateUpdate.title}
            </MainText>
        </FormUpdate>
    )

}