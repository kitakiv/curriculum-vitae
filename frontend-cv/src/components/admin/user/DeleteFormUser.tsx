import { Resource, resourceConfig } from "@/variables/admin/resource";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";
import MiddleText from "@/components/text/MiddleText";
import { User } from "@/gql/graphql";

interface Props {
    resource: User;
    resourceId: string;
}

export default function DeleteFormUser({resource, resourceId }: Props) {
    const userDelete = resourceConfig[Resource.USER].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<{id: string}>
                inputs={inputs}
                schema={userDelete.schema(resourceId)}
                initialValues={userDelete.initialValues}
                actionForm={(formData) => userDelete.action(undefined, formData, resourceId)}
                title={userDelete.title}
            >
                <>
                <MainText tailwind="text-center">
                    {userDelete.title}
                </MainText>
                <MiddleText tailwind=" text-txFirst0" >
                    {resource.login}
                </MiddleText>
                 </>
            </FormDelete>
     </>  
    )
}