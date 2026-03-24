import { Resource, resourceConfig } from "@/variables/admin/resource";
import { Certificate, UpdateCertificateInput} from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";

import MiddleText from "@/components/text/MiddleText";

interface Props {
    resource: Certificate;
    resourceId: string;
}

export default function DeleteFormCertificate({resource, resourceId }: Props) {
    const certificateDelete = resourceConfig[Resource.CERTIFICATE].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<UpdateCertificateInput>
                inputs={inputs}
                schema={certificateDelete.schema(resourceId)}
                initialValues={certificateDelete.initialValues}
                actionForm={(formData) => certificateDelete.action(undefined, formData, resource, resourceId)}
                title={certificateDelete.title}
            >
                <>
                <MainText tailwind="text-center">
                    {certificateDelete.title}
                </MainText>
                <MiddleText tailwind=" text-txFirst0" >
                    {resource.certificateTitle}
                </MiddleText>
                 </>
            </FormDelete>
     </>  
    )
}