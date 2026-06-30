import { Resource, resourceConfig } from "@/variables/admin/resource";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";
import MiddleText from "@/components/text/MiddleText";
import { Role, UpdateRoleInput } from "@/gql/graphql";
import RoleDeleteList from "./RoleDeleteList";

interface Props {
    resource: Role;
    resourceId: string;
}

export default function DeleteFormRole({resource, resourceId }: Props) {
    const roleDelete = resourceConfig[Resource.ROLE].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<UpdateRoleInput>
                inputs={inputs}
                schema={roleDelete.schema(resourceId)}
                initialValues={roleDelete.initialValues}
                actionForm={(formData) => roleDelete.action(undefined, formData, resource, resourceId)}
                title={roleDelete.title}
            >
                <>
                <RoleDeleteList resource={resource} />
                 </>
            </FormDelete>
     </>  
    )
}