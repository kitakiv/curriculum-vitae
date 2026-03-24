import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateSliderInput, UpdateContactInput, UpdateSliderInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";
import { Contact } from "@/gql/graphql";

import MiddleText from "@/components/text/MiddleText";

interface Props {
    resource: Contact;
    resourceId: string;
}

export default function DeleteFormContact({resource, resourceId }: Props) {
    const contactDelete = resourceConfig[Resource.CONTACT].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<UpdateContactInput>
                inputs={inputs}
                schema={contactDelete.schema(resourceId)}
                initialValues={contactDelete.initialValues}
                actionForm={(formData) => contactDelete.action(undefined, formData, resource, resourceId)}
                title={contactDelete.title}
            >
                <>
                <MainText tailwind="text-center">
                    {contactDelete.title}
                </MainText>
                <MiddleText tailwind=" text-txFirst0" >
                    {resource.contactName}
                </MiddleText>
                 </>
            </FormDelete>
     </>  
    )
}