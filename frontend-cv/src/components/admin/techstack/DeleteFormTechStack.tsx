import { Resource, resourceConfig } from "@/variables/admin/resource";
import { TechStack, UpdateTechStackInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";
import MiddleText from "@/components/text/MiddleText";

interface Props {
    resource: TechStack;
    resourceId: string;
}

export default function DeleteFormTechStack({resource, resourceId }: Props) {
    const sliderDelete = resourceConfig[Resource.TECHSTACK].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<UpdateTechStackInput>
                inputs={inputs}
                schema={sliderDelete.schema(resourceId)}
                initialValues={sliderDelete.initialValues}
                actionForm={(formData) => sliderDelete.action(undefined, formData, resource, resourceId)}
                title={sliderDelete.title}
            >
                <>
                <MainText tailwind="text-center">
                    {sliderDelete.title}
                </MainText>
                <MiddleText tailwind=" text-txFirst0" >
                    {resource.techName}
                </MiddleText>
                 </>
            </FormDelete>
     </>  
    )
}