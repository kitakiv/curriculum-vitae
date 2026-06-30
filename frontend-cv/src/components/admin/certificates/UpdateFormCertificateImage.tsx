import { Certificate, CreateCertificateInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import { useState } from "react";


interface Props {
    initialValues: Certificate,
    resourceId: string,
}

export default function UpdateFormCertificateImage({ initialValues, resourceId }: Props) {
    const updateCertificateImage = resourceConfig[Resource.CERTIFICATE].editFormImage;
    const [image, setImage] = useState(initialValues.certificateImage);

    return (
        <FormUpdate<CreateCertificateInput[
            "certificateImage"]>
            inputs={updateCertificateImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValues}
            actionForm={async (formData) => {
                const res = await updateCertificateImage.action(
                    undefined,
                    formData,
                    resourceId
                );
                if (res.success && res.data) {
                    setImage(res.data);
                }
                return res;
            }
        
            }
            schema={updateCertificateImage.schema}
            title={updateCertificateImage.title}
        >   
           <img src={image} alt={initialValues.certificateTitle} className="w-72 h-fit rounded-lg" />
        </FormUpdate>
    )
}