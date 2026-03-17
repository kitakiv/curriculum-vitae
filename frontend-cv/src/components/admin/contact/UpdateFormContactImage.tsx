import { Contact, CreateContactInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";


interface Props {
    initialValues: Contact,
    resourceId: string,
}

export default function UpdateFormContactImage({ initialValues, resourceId }: Props) {
    const contactUpdateImage = resourceConfig[Resource.CONTACT].editFormImage;
    const initialValuesEmpty = contactUpdateImage.initialValues;
    Object.keys(initialValuesEmpty).forEach((key: string) => {
        initialValuesEmpty[key] = initialValues[key];
    })
    const contactUpdate = resourceConfig[Resource.CONTACT].editFormImage;

    return (
        <FormUpdate<CreateContactInput>
            inputs={contactUpdate.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValuesEmpty}
            actionForm={(formData) =>
                contactUpdate.action(
                    undefined,
                    formData,
                    resourceId
                )
            }
            schema={contactUpdate.schema}
            title={contactUpdate.title}
        >
           <img src={initialValues.contactSvg || ''} alt={initialValues.contactName} className="h-40 w-40" />
        </FormUpdate>
    )
}