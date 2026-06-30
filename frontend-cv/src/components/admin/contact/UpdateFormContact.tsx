import { Contact, CreateContactInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";

interface Props {
    initialValues: Contact,
    resourceId: string,
}

export default function UpdateFormContact({initialValues, resourceId }: Props) {
    const contactUpdate = resourceConfig[Resource.CONTACT].editFrom;
    const initialValuesEmpty = contactUpdate.initialValues;
    Object.keys(initialValuesEmpty).forEach((key: string) => {
        initialValuesEmpty[key] = initialValues[key];
    })

    return (
        <FormUpdate<CreateContactInput>
            inputs={contactUpdate.inputs}
            intialValues={initialValuesEmpty}
            actionForm={(formData) =>
                contactUpdate.action(
                    undefined,
                    formData,
                    initialValuesEmpty,
                    resourceId
                )
            }
            schema={contactUpdate.schema}
            title={contactUpdate.title}
        >
            <MainText tailwind="text-center">
                {contactUpdate.title}
            </MainText>
        </FormUpdate>
    )

}