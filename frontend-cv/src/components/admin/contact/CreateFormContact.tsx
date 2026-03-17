import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateContactInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";

export default function CreateFormContact() {
    const contactCreate = resourceConfig[Resource.CONTACT].createForm;
    return (
        <>
            <FormCreate<CreateContactInput>
                inputs={contactCreate.inputs}
                intialValues={contactCreate.initialValues}
                actionForm={(formData) => contactCreate.action(undefined, formData)}
                schema={contactCreate.schema}
                title={contactCreate.title}
            >
                <MainText tailwind="text-center">
                    {contactCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}