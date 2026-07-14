import { Contact, CreateContactInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import { useState } from "react";


interface Props {
    initialValues: Contact,
    resourceId: string,
}

export default function UpdateFormContactImage({ initialValues, resourceId }: Props) {
    const contactUpdateImage = resourceConfig[Resource.CONTACT].editFormImage;
    const initialValuesEmpty = contactUpdateImage.initialValues;
    const contactUpdate = resourceConfig[Resource.CONTACT].editFormImage;
    const [image, setImage] = useState(initialValues.contactSvg);

    return (
        <FormUpdate<CreateContactInput["contactSvg"]>
            inputs={contactUpdate.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValuesEmpty}
            actionForm={async (formData) => {
                const res = await contactUpdateImage.action(
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
            schema={contactUpdate.schema}
            title={contactUpdate.title}
        >
           <img src={image as string} alt={initialValues.contactName} className="h-40 w-40" />
        </FormUpdate>
    )
}