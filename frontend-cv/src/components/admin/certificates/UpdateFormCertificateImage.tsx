import { Certificate, CreateCertificateInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";


interface Props {
    initialValues: Certificate,
    resourceId: string,
}

export default function UpdateFormCertificateImage({ initialValues, resourceId }: Props) {
    const updateCertificateImage = resourceConfig[Resource.CERTIFICATE].editFormImage;

    return (
        <FormUpdate<CreateCertificateInput>
            inputs={updateCertificateImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValues}
            actionForm={(formData) =>
                updateCertificateImage.action(
                    undefined,
                    formData,
                    resourceId
                )
            }
            schema={updateCertificateImage.schema}
            title={updateCertificateImage.title}
        >   
           <img src={initialValues.certificateImage} alt={initialValues.certificateTitle} className="w-72 h-fit rounded-lg" />
        </FormUpdate>
    )
}